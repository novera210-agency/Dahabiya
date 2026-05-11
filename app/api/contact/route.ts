import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, dates, guests, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // When SMTP credentials are configured, replace this block with nodemailer transport
    // For now, log the enquiry and return success (ready for integration)
    console.log("New enquiry received:", { name, email, phone, dates, guests, message });

    // TODO: Configure nodemailer with client's SMTP credentials
    // const transporter = nodemailer.createTransport({ host, port, auth: { user, pass } });
    // await transporter.sendMail({ from, to: "info@treasureegypttours.com", subject, html });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
