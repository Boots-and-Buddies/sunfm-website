import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import nodemailer from "nodemailer";

const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.SQUARE_ENVIRONMENT === "sandbox"
      ? SquareEnvironment.Sandbox
      : SquareEnvironment.Production,
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  goal: string;
  goalDetails: string;
  experience: string;
  currentRoutine: string;
  motivation: string;
  injuries: string;
  referral: string;
  referralDetails: string;
  contactMethod: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();

    if (!data.name || !data.email || !data.phone || !data.goal || !data.referral) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (process.env.CONSULTATION_SHEETS_WEBHOOK_URL) {
      await fetch(process.env.CONSULTATION_SHEETS_WEBHOOK_URL, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          age: data.age || "",
          preferredContact: data.contactMethod,
          goal: data.goal + (data.goalDetails ? ` — ${data.goalDetails}` : ""),
          experience: data.experience,
          currentRoutine: data.currentRoutine || "",
          motivation: data.motivation || "",
          injuries: data.injuries || "",
          howTheyHeard: data.referral + (data.referralDetails ? ` — ${data.referralDetails}` : ""),
          submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
        }),
      });
    }

    // Add customer to Square "Lead - Consultation" group
    try {
      const [firstName, ...rest] = data.name.trim().split(" ");
      const lastName = rest.join(" ");

      const searchResult = await squareClient.customers.search({
        query: { filter: { emailAddress: { exact: data.email } } },
      });

      let customerId: string;
      if (searchResult.customers && searchResult.customers.length > 0) {
        customerId = searchResult.customers[0].id!;
      } else {
        const createResult = await squareClient.customers.create({
          givenName: firstName,
          familyName: lastName,
          emailAddress: data.email,
          phoneNumber: data.phone,
          note: "Submitted consultation form via website",
        });
        customerId = createResult.customer!.id!;
      }

      await squareClient.customers.groups.add({
        customerId,
        groupId: process.env.SQUARE_CONSULTATION_GROUP_ID!,
      });
    } catch (squareError) {
      console.error("Square customer error:", squareError);
    }

    const recipients = process.env.NOTIFICATION_EMAILS || "";

    await transporter.sendMail({
      from: `"SunFM Notifications" <${process.env.GMAIL_USER}>`,
      to: recipients,
      subject: `New Consultation Request: ${data.name}`,
      text: `
New consultation request from ${data.name}

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Age: ${data.age || "Not provided"}
Preferred Contact: ${data.contactMethod}

Goal: ${data.goal}${data.goalDetails ? ` — ${data.goalDetails}` : ""}
Experience: ${data.experience}
Current Routine: ${data.currentRoutine || "Not provided"}
Motivation: ${data.motivation || "Not provided"}
Injuries/Pain: ${data.injuries || "None"}

How they heard about SunFM: ${data.referral}${data.referralDetails ? ` — ${data.referralDetails}` : ""}
      `.trim(),
    });

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
