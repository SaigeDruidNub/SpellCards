import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    console.log("Received email request");
    const { email, spell } = await request.json();
    console.log("Email:", email);
    console.log("Spell name:", spell?.name || "undefined");

    // Check for required env vars
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing Gmail credentials in environment variables");
      return NextResponse.json({ 
        error: 'Server configuration error' 
      }, { status: 500 });
    }

    // Create a transporter using Gmail with fixed SSL settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      // Fix for self-signed certificate error
      tls: {
        rejectUnauthorized: false // This allows self-signed certificates
      }
    });

    // Rest of your code remains the same...
    // Verify transporter credentials
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      return NextResponse.json({ 
        error: 'Email server connection failed' 
      }, { status: 500 });
    }

    interface SpellComponent {
      type: 'crystal' | 'herb';
      name: string;
    }

    interface Spell {
      name: string;
      components: SpellComponent[];
      directions: string;
      words: string;
    }

    const componentsList = (spell.components as SpellComponent[]).map(c => 
      `<li>${c.type === 'crystal' ? '💎' : '🌿'} ${c.name}</li>`
    ).join('');

    // Setup email data
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Custom Magic Spell: ${spell.name}`,
      html: `
        <div>
          <h1>${spell.name}</h1>
          
          <h2>Components</h2>
          <ul>
            ${componentsList}
          </ul>

          <h2>Directions</h2>
          <p>${spell.directions}</p>

          <h2>Words of Power</h2>
          <p>${spell.words}</p>
        </div>
      `,
    };

    // Send email
    console.log("Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error details:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}