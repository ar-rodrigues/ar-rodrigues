import { NextResponse } from "next/server";
import { sendContactEmail } from "@/utils/mailer/mailer";
import { checkRateLimit, getClientIP } from "@/utils/rateLimit";

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Demasiados intentos. Por favor, intenta de nuevo más tarde." },
        { status: 429 }
      );
    }

    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return NextResponse.json(
        { error: "Formato de solicitud inválido" },
        { status: 400 }
      );
    }

    const { name, email, message, website, formStartTime, submissionTime } = body;

    // Honeypot validation - if website field is filled, it's likely a bot
    if (website && website.trim() !== "") {
      // Silent rejection - return generic error to avoid revealing the honeypot
      return NextResponse.json(
        { error: "Error al enviar el mensaje. Por favor, intenta de nuevo." },
        { status: 400 }
      );
    }

    // Time-based validation - check if form was submitted too quickly
    if (formStartTime && submissionTime) {
      const timeDifference = submissionTime - formStartTime;
      const MIN_SUBMISSION_TIME_MS = 3000; // 3 seconds minimum

      if (timeDifference < MIN_SUBMISSION_TIME_MS) {
        // Silent rejection - return generic error
        return NextResponse.json(
          { error: "Error al enviar el mensaje. Por favor, intenta de nuevo." },
          { status: 400 }
        );
      }
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El formato del email no es válido" },
        { status: 400 }
      );
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email configuration missing");
      return NextResponse.json(
        { error: "Configuración de email no disponible. Por favor, contacta al administrador." },
        { status: 500 }
      );
    }

    // Send the contact email
    try {
      await sendContactEmail(name, email, message);
    } catch (emailError) {
      console.error("Error sending contact email:", emailError);
      return NextResponse.json(
        { error: emailError.message || "Error al enviar el mensaje. Por favor, intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Mensaje enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error processing contact form:", error);
    return NextResponse.json(
      { error: error.message || "Error al procesar la solicitud. Por favor, intenta de nuevo." },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

