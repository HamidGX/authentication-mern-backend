import express from 'express'
const router = express.Router()
import {
	register,
	authenticate,
	confirm,
	forgotPassword,
	checkToken,
	newPassword,
	profile,
} from '../controllers/userController'
import checkAuth from '../middleware/checkAuth'

// Authentication, Creation, Registration, and Confirmation of Users
router.post('/', register)
router.post('/login', authenticate)
router.get('/confirm/:token', confirm)
router.post('/forgot-password', forgotPassword)
router.get('/forgot-password/:token', checkToken)
router.post('/forgot-password/:token', newPassword)
router.get('/profile', checkAuth, profile)
export default router
