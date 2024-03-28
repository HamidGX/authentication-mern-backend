import { Request, Response } from 'express'
import User, { UserDocument } from '../models/User'
import generateId from '../helpers/generateId'
import generateJWT from '../helpers/generateJWT'
import { registerEmail, forgotPasswordEmail } from '../helpers/email'

const register = async (req: Request, res: Response) => {
	const { email } = req.body
	const existingUser: UserDocument | null = await User.findOne({ email: email })
	if (existingUser) {
		return res.status(400).json({ msg: 'User already registered' })
	}

	try {
		const user: UserDocument = new User(req.body)
		user.token = generateId()
		user.password = await user.encrypPassword(user.password)
		await user.save()
		registerEmail({
			email: user.email,
			name: user.name,
			token: user.token,
		})
		res.json({
			msg: 'User created successfully',
		})
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json(error.message)
		}
	}
}

const authenticate = async (req: Request, res: Response) => {
	const { email, password } = req.body
	const user: UserDocument | null = await User.findOne({ email })
	if (!user) {
		return res.status(404).json({ msg: 'User does not exist' })
	}

	if (!user.confirmed) {
		return res.status(403).json({ msg: 'Your account has not been confirmed' })
	}

	if (await user.checkPassword(password)) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateJWT(user._id),
			msg: 'User authenticated successfully',
		})
	} else {
		return res.status(403).json({ msg: 'Incorrect password' })
	}
}

const confirm = async (req: Request, res: Response) => {
	const { token } = req.params
	const userToConfirm: UserDocument | null = await User.findOne({ token })
	if (!userToConfirm) {
		return res.status(404).json({ msg: 'Invalid token' })
	}
	try {
		userToConfirm.confirmed = true
		userToConfirm.token = ''
		await userToConfirm.save()
		res.json({ msg: 'User confirmed successfully' })
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json(error.message)
		}
	}
}

const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body
	const user: UserDocument | null = await User.findOne({ email })
	if (!user) {
		return res.status(404).json({ msg: 'User does not exist' })
	}

	try {
		user.token = generateId()
		await user.save()
		forgotPasswordEmail({
			email: user.email,
			name: user.name,
			token: user.token,
		})
		res.json({ msg: 'We have sent an email with instructions' })
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json(error.message)
		}
	}
}

const checkToken = async (req: Request, res: Response) => {
	const { token } = req.params

	const validToken: UserDocument | null = await User.findOne({ token })
	if (validToken) {
		res.json({ msg: 'Token is valid and user exists' })
	} else {
		return res.status(404).json({ msg: 'Invalid token' })
	}
}

const newPassword = async (req: Request, res: Response) => {
	const { token } = req.params
	const { password } = req.body

	const user: UserDocument | null = await User.findOne({ token })

	if (user) {
		user.password = password
		user.token = ''
		try {
			await user.save()
			res.json({ msg: 'Password has been changed successfully' })
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json(error.message)
			}
		}
	} else {
		res.status(404).json({ msg: 'Invalid token' })
	}
}

interface AuthenticatedRequest extends Request {
	user?: string // Or other type
}

const profile = async (req: AuthenticatedRequest, res: Response) => {
	const { user } = req
	res.json(user)
}

export {
	register,
	authenticate,
	confirm,
	forgotPassword,
	checkToken,
	newPassword,
	profile,
}
