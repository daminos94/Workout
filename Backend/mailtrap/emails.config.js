import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Email sent successfully", response);
        
    } catch (error) {
        console.log(`Error sending verification`, error);
        
        throw new Error (`Error sending verification email: ${error}`)
    }
}


export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "c177ae45-d459-4c11-8d0a-72c6c3382f58",
            template_variables: {
                name: name
              }
        });

        console.log("welcome email sent successfully", response);
        
    } catch (error) {
        throw new Error(`Error sending welcome email: ${error}`);
    }
}


export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
    } catch (error) {
      console.error(`Error sending password reset email`, error);
      throw new error(`Error sneding password reset email: ${error}`);  
    }
}


export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("Password reset email send successfully", response);
    } catch (error) {
        console.log(`Error sending password reset success email`, error);

        throw new Error(`Error senfing password reset success email: ${error}`);
    }
}