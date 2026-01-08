"use server";
import nodemailer from "nodemailer";
import { getWelcomeEmailTemplate } from "./templates/welcomeEmail";

export async function sendEmail(email, name, password, subject, body) {
  try {
    const port = process.env.EMAIL_PORT || "587";
    const secure = port === "465";

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port,
      secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("Email transporter verified successfully");
    } catch (verifyError) {
      console.error("Email transporter verification failed:", verifyError);
      throw verifyError;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject || "Bienvenido al servicio de DICA MX",
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Detailed error sending email:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

export async function sendWelcomeEmail(email, name, password, baseUrl) {
  if (!baseUrl) {
    throw new Error("baseUrl is required for sending welcome email");
  }

  try {
    const subject = "Bienvenid@";
    const body = getWelcomeEmailTemplate(name, email, password, baseUrl);

    console.log("Welcome email template generated successfully");
    return await sendEmail(email, name, password, subject, body);
  } catch (error) {
    console.error("Error in sendWelcomeEmail:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}
