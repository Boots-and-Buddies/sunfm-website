import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function processSignup(firstName: string, lastName: string, email: string) {
  try {
    // Append to Google Sheet
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      const sheetsRes = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${firstName} ${lastName}`,
          email,
          updatedAt: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
        }),
      });
      console.log(`Google Sheets response: ${sheetsRes.status} ${await sheetsRes.text()}`);
    }

    // Send email notification
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
          <p><strong>Time:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST</p>
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

    await processSignup(firstName, lastName, email);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { error: "Failed to add to waitlist" },
      { status: 500 }
    );
  }
}
