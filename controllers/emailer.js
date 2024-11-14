const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using your SMTP service credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server for Gmail
    port: 587,  // Port 587 for TLS
    secure: false,  // Use TLS
    auth: {
        user: process.env.EMAIL_USER, // Your email address (loaded from .env)
        pass: process.env.EMAIL_PASS  // Your email password (loaded from .env)
    }
});

/**
 * Function to send an email
 * @param {string} to - The recipient email address
 * @param {string} subject - The subject of the email
 * @param {string} text - The plain text body of the email
 * @param {string} html - The HTML body of the email (optional)
 * @returns {Promise} - A promise that resolves when the email is sent
 */
const sendEmail = async (to, user) => {
    const subject = 'Welcome to Your To-Do List App!';
    const text = `Hello ${user.firstname},\n\nWelcome to your new To-Do List app! We are excited to help you manage your tasks and stay organized. You can start adding, updating, and completing your tasks right away!\n\nLet's get started!`;

    const html = `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #2b89c1;">Welcome, ${user.firstName}!</h1>
                    <p style="font-size: 18px;">We’re thrilled to have you on board. You can now manage your tasks, set reminders, and stay organized all in one place. Our app is here to help you be more productive and achieve your goals.</p>
                    <p style="font-size: 18px;">To get started:</p>
                    <ul style="font-size: 18px;">
                        <li>Click <strong>"<a href="http://localhost/addtask">Add Task</a>"</strong> to create your first task.</li>
                        <li>Set reminders so you never miss a deadline.</li>
                        <li>Mark tasks as completed once you're done!</li>
                    </ul>
                    <p style="font-size: 18px;">We're excited to help you stay organized! Let us know if you need any help.</p>
                    <p style="font-size: 18px; margin-top: 30px;">Best regards,</p>
                    <p style="font-size: 18px;">The To-Do List App Team</p>
                    <footer style="text-align: center; font-size: 14px; color: #aaa; padding-top: 20px;">
                        <p>You're receiving this email because you signed up for the To-Do List app.</p>
                    </footer>
                </div>
            </body>
        </html>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to,  // Recipient email
        subject,  // Subject line
        text,  // Plain text body
        html,  // HTML body (formatted)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

// Example: Send a test email (make sure user object contains firstname)
const sendTestEmail = async () => {
    try {
        // Example user object
        const user = {firstname: 'John', email: 'iifr3onyt@gmail.com'};

        // Send email using user data
        const info = await sendEmail(user.email, user);
        console.log('Email sent successfully:', info);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

// Call the function to send the email
// sendTestEmail();

// Export the sendEmail function for use in other parts of the application
module.exports = {sendEmail, sendTestEmail};
