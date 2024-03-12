import mongoose, { Document, Model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
	name: string
	password: string
	email: string
	token?: string
	confirmed: boolean
	encrypPassword(password: string): Promise<string>
	checkPassword(password: string): Promise<boolean>
}

export interface UserModel extends Model<UserDocument> {}

const userSchema = new mongoose.Schema<UserDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		token: {
			type: String,
		},
		confirmed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

// Hash password
userSchema.methods.encrypPassword = async (
	password: string
): Promise<string> => {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(password, salt)
}

userSchema.methods.checkPassword = async function (
	passwordForm: string
): Promise<boolean> {
	return await bcrypt.compare(passwordForm, this.password)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export default User
