import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
