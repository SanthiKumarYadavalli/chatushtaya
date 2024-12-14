// const nodemailer = require("nodemailer");

// const SENDER = "sithlord5995@gmail.com";

// // Email Configuration
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: SENDER, // Replace with your email
//     pass: "cezmwkmytywwmicp", // Replace with your app password
//   },
// });

// // Helper to generate HTML content for emails
// const generateEmailHtml = (title, content, buttonText, buttonLink) => `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <style>
//       body { font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f9; margin: 0; padding: 0; }
//       .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
//       .header { background-color: #4CAF50; color: #ffffff; text-align: center; padding: 10px 0; border-radius: 10px 10px 0 0; }
//       .header h1 { margin: 0; }
//       .content { padding: 20px; color: #333333; }
//       .content h2 { color: #4CAF50; }
//       .button { display: inline-block; margin: 20px 0; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; }
//       .footer { text-align: center; font-size: 12px; color: #777777; padding: 10px; }
//     </style>
//   </head>
//   <body>
//     <div class="email-container">
//       <div class="header">
//         <h1>${title}</h1>
//       </div>
//       <div class="content">
//         ${content}
//         <a href="${buttonLink}" class="button">${buttonText}</a>
//         <p>Warm regards,<br>The chatushtaya Team</p>
//       </div>
//       <div class="footer">
//         <p>You are receiving this email because you registered or submitted a report on SafeHaven.</p>
//         <p>&copy; 2024 SafeHaven. All rights reserved.</p>
//       </div>
//     </div>
//   </body>
//   </html>
// `;

// // Generalized function to send email
// export const sendEmail = async (to, subject, htmlContent) => {
//   const mailOptions = {
//     from: SENDER,
//     to,
//     subject,
//     html: htmlContent,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent: ${info.response}`);
//   } catch (error) {
//     console.error("Error sending email:", error.message);
//     throw error;
//   }
// };

// // Specific email functions
// export const sendWelcomeEmail = async (recipientEmail, userName) => {
//   const content = `
//     <p>Dear ${userName},</p>
//     <p>Welcome to <strong>SafeHaven</strong>, a platform dedicated to creating a safer and more inclusive environment for all students. We're thrilled to have you on board!</p>
//     <h2>Here’s what you can do with SafeHaven:</h2>
//     <ul>
//       <li><strong>Report incidents:</strong> Document harassment cases with details like type, location, and time.</li>
//       <li><strong>Stay supported:</strong> Access resources for emotional and physical well-being.</li>
//       <li><strong>Connect safely:</strong> Report anonymously and securely to university authorities or grievance cells.</li>
//       <li><strong>Get help:</strong> Join peer support groups and find actionable solutions to your concerns.</li>
//     </ul>
//     <p>Your safety and well-being are our top priorities. Together, let’s build a campus community where everyone feels secure and respected.</p>
//   `;
//   const htmlContent = generateEmailHtml(
//     "Welcome to SafeHaven",
//     content,
//     "Get Started Now",
//     "https://yourapp.com"
//   );
//   await sendEmail(recipientEmail, "Welcome to SafeHaven!", htmlContent);
// };

// export const sendReportSubmissionEmail = async (recipientEmail, userName) => {
//   const content = `
//     <p>Dear ${userName},</p>
//     <p>Thank you for taking the brave step of reporting an incident on <strong>SafeHaven</strong>. Your submission has been successfully received and logged in our system.</p>
//     <p>Our team is here to support you. Depending on the details of your report, you may be contacted by university authorities or support teams for further steps.</p>
//     <h2>Next Steps</h2>
//     <ul>
//       <li><strong>Monitor Updates:</strong> You can log in to SafeHaven to check the status of your report.</li>
//       <li><strong>Access Support:</strong> Visit the app for additional resources or contact support for further assistance.</li>
//       <li><strong>Stay Connected:</strong> Our team will keep you updated via email or through the app regarding any actions taken.</li>
//     </ul>
//   `;
//   const htmlContent = generateEmailHtml(
//     "Report Submission Confirmation",
//     content,
//     "View My Reports",
//     "https://yourapp.com"
//   );
//   await sendEmail(
//     recipientEmail,
//     "Your Report Submission Confirmation",
//     htmlContent
//   );
// };

// // Example Usage
