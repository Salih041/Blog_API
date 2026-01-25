import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_KEY);
const sendEmail = async (options) => {
    try {
        const data = await resend.emails.send({
            from: 'Selamy <noreply@selamy.me>',
            to: options.email,
            subject: options.subject,
            html: options.html
        })
        console.log("Email sent (Resend ID):", data.id);
        return data;
    } catch (error) {
        console.error("Resend Error:", error);
        throw new Error("Email couldnt be sent: " + error.message);
    }
}

export default sendEmail;