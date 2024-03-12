import { CorsOptions } from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Define the whitelist
const whitelist = process.env.CORS_WHITELIST!.split(',')

// Configure CORS options
const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || whitelist.includes(origin)) {
			// Request is allowed
			callback(null, true)
		} else {
			// Request is not allowed
			callback(new Error('Not allowed by CORS'))
		}
	},
}

export default corsOptions
