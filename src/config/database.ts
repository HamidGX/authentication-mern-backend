import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI!, {})
		const url = `${connection.connection.host}:${connection.connection.port}`
		console.log(`MongoDB connected at: ${url}`)
	} catch (error) {
		console.log(error as Error)
		process.exit(1) // Forcefully terminates the process asynchronously.
	}
}

export default connectDB
