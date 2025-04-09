import express from "express";
import { registerUser, logInUser, userCredits } from "../Controllers/userConroller.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router()

userRouter.post('/register' ,registerUser)
userRouter.post('/login' ,logInUser)
userRouter.get('/credits',userAuth ,userCredits)

export default userRouter;

//http://localhost:4000/api/user/login
//http://localhost:4000/api/user/register
//http://localhost:4000/api/user/credits