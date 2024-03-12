import nodemailer, { TransportOptions, SentMessageInfo } from 'nodemailer'

interface EmailRegistro {
	email: string
	name: string
	token: string
}

export const registerEmail = async (datos: EmailRegistro) => {
	const { email, name, token } = datos

	//Transport Mailtrap
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	} as TransportOptions)

	//Informacion del email
	// Email Information
	const info: SentMessageInfo = await transport.sendMail({
		from: 'Dashboard <accounts@example.net>',
		to: email,
		subject: 'Confirm Your Account',
		text: 'Please verify your account',
		html: `<p>Hi ${name},</p>
           <p>Your account is almost ready. You just need to confirm it by clicking on the following link:</p>
           <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>
           <p>If you didn't create this account, you can ignore this message.</p>
    `,
	})
	return info
}

export const forgotPasswordEmail = async (datos: EmailRegistro) => {
	const { email, name, token } = datos

	//Transport Mailtrap
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	} as TransportOptions)

	// Email Information
	const info: SentMessageInfo = await transport.sendMail({
		from: 'Dashboard <accounts@example.net>',
		to: email,
		subject: 'Reset Your Password',
		text: 'Reset Your Password',
		html: `<p>Hello ${name},</p>
           <p>You have requested to reset your password.</p>
           <p>Follow the link below to generate a new password:</p>
           <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>
           <p>If you didn't request to reset your password, you can ignore this message.</p>
    `,
	})
	return info
}
