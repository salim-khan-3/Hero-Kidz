// // src/lib/email.js
// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,        
//   port: process.env.SMTP_PORT || 587, 
//   secure: false,                      
//   auth: {
//     user: process.env.SMTP_USER,      // তোমার email
//     pass: process.env.SMTP_PASS,      // email password বা app password
//   },
// });


// src/lib/email.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // 587 port er jonno false thaka thik ache
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Eikhane oi 16-character code-ti thakbe
  },
});