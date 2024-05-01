import nodemailer from "nodemailer";
import template from "./template";
import { render } from "@react-email/render";

const transporter = async (userEmail: string, OTP: number) => {
  const html = render(template(OTP), { pretty: true });
  const nodeConfig = {
    port: 587,
    host: "smtp.ethereal.email",
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  };
  const message = {
    from: process.env.EMAIL_ADDRESS,
    to: userEmail,
    subject: "Signup Successful",
    text: `Hello`,
    html: html,
  };
  return nodemailer.createTransport(nodeConfig).sendMail(message);
};

export default transporter;

