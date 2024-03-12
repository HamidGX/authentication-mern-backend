import { Request as ExpressRequest, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

interface AuthRequest extends ExpressRequest {
	user?: any // Define the user property here
}

const checkAuth = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	let token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]
			const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

			req.user = await User.findById(decoded.id).select(
				'-password -confirmed -token -createdAt -updatedAt -__v'
			)
			next()
		} catch (error) {
			res.status(404).json({ msg: 'There was an error' })
		}
	}
	if (!token) {
		res.status(401).json({ msg: 'Invalid token' })
	}
}

export default checkAuth
