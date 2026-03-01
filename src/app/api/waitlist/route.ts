import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import nodemailer from "nodemailer";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.SQUARE_ENVIRONMENT === "sandbox"
      ? SquareEnvironment.Sandbox
      : SquareEnvironment.Production,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Process signup in the background (fire and forget)
async function processSignup(firstName: string, lastName: string, email: string) {
  try {
    // Step 1: Search for existing customer by email
    const searchResult = await client.customers.search({
      query: {
        filter: {
          emailAddress: { exact: email },
        },
      },
    });

    let customerId: string;

    if (searchResult.customers && searchResult.customers.length > 0) {
      // Customer exists, use their ID
      customerId = searchResult.customers[0].id!;

      // Optionally update their name if it was empty
      const existingCustomer = searchResult.customers[0];
      if (!existingCustomer.givenName || !existingCustomer.familyName) {
        await client.customers.update({
          customerId,
          givenName: firstName,
          familyName: lastName,
        });
      }
    } else {
      // Step 2: Create new customer
      const createResult = await client.customers.create({
        givenName: firstName,
        familyName: lastName,
        emailAddress: email,
        note: "Signed up via website waitlist",
      });
      customerId = createResult.customer!.id!;
    }

    // Step 3: Add customer to the "Lead - Waitlist" group
    const groupId = process.env.SQUARE_WAITLIST_GROUP_ID!;
    await client.customers.groups.add({
      customerId,
      groupId,
    });

    // Step 4: Send email notification
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const recipients = process.env.NOTIFICATION_EMAILS || process.env.GMAIL_USER;
      console.log(`Sending notification email to: ${recipients}`);
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: recipients,
        subject: `New Waitlist Signup: ${firstName} ${lastName}`,
        html: `
          <h2>New Waitlist Signup</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `,
      });
      console.log("Notification email sent successfully");
    } else {
      console.warn("Email not sent: GMAIL_USER or GMAIL_APP_PASSWORD not set");
    }
  } catch (error) {
    console.error("Background waitlist signup error:", error);
  }
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email } = await request.json();

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 }
      );
    }

    // Fire and forget - don't await
    processSignup(firstName, lastName, email);

    // Return immediately
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { error: "Failed to add to waitlist" },
      { status: 500 }
    );
  }
}
