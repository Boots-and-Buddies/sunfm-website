import { NextResponse } from "next/server";

// Google Sheets API integration
// You'll need to set up these environment variables:
// GOOGLE_SHEETS_ID - The ID of your Google Sheet
// GOOGLE_SERVICE_ACCOUNT_EMAIL - Your service account email
// GOOGLE_PRIVATE_KEY - Your service account private key

interface FormData {
  name: string;
  email: string;
  phone: string;
  goal: string;
  injuries: string;
  referral: string;
  contactMethod: string;
}

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.goal || !data.referral) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // For now, we'll log the data and return success
    // In production, this would send to Google Sheets
    console.log("Form submission received:", data);

    // Google Sheets integration
    // Uncomment and configure when ready:
    /*
    const { google } = require('googleapis');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          data.name,
          data.email,
          data.phone,
          data.goal,
          data.injuries || 'None specified',
          data.referral,
          data.contactMethod,
        ]],
      },
    });
    */

    // For development/demo, simulate success
    // Remove this and uncomment above for production
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
