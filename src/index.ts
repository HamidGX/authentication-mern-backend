import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import corsOptions from './config/cors'
import connectDB from './config/database'
import userRoutes from './routes/userRoutes'

// Load environment variables
dotenv.config()

// Create an Express app
const app = express()

// Middleware
app.use(cors(corsOptions))
app.use(express.json()) // Processes JSON data

// Connect to the database
connectDB()

// Routing
app.use('/api/users', userRoutes)

// Define the port
const PORT = process.env.PORT

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`)
})
