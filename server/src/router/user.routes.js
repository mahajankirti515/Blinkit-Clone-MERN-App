import { Router } from "express";
import { forgotPasswordController, getUserDetails, loginController, logoutController, ragisterUserController, refreshToken, resetPassword, updateUserController, uploadAvatarController, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";


const userRouter = Router()

userRouter.post('/ragister', ragisterUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', auth, logoutController)
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController )
userRouter.put('/update-user', auth, updateUserController)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtp)
userRouter.put('/reset-password', resetPassword)
userRouter.post('/refresh-token', refreshToken)
userRouter.get('/user-details', auth, getUserDetails)

export default userRouter