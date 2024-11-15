import { Request, Response } from "express"
import User from '../models/userModel'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/jwt";

interface CustomRequest extends Request {
  user?: UserPayload;
}


const signupUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body

    let userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const userData = await user.save();
    if (userData) {
      res
        .status(201)
        .json({ message: "Sign up successful", user: userData });
    } else {
      throw Error("Something went wrong while creating user");
    }

  } catch (error) {
    res.status(500).json({ message: 'Invalid server error', error })
  }
}


const signinUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;    

    let userExist = await User.findOne({ email: email });
    if (!userExist) {      

      return res.status(404).json({ message: "User not found" });
    }

    const passwordCorrect = await bcrypt.compare(password, userExist.password);

    if (passwordCorrect) {

      let payload = {
        userName: userExist.name,
        userId: userExist._id,
        iat: Date.now(),
      };

      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACC_SECRET as string,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REF_SECRET as string,
        { expiresIn: "7d" }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        jwtToken: accessToken,
        userData: userExist,
      });

    } else {
      res.status(400).json({ message: "Incorrect password" });
    }

  } catch (error) {
    res.status(500).json({ message: 'Invalid server error', error })
  }
}

const userProfile = async (req: CustomRequest, res: Response): Promise<any> => {
  try {
    const userData = await User.findById(req.user?.userId);
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while fetching user" });
  }
}

const updateProfile = async (req: CustomRequest, res: Response): Promise<any> => {
  try {

    if (req.body.email) {
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist && String(userExist._id) !== req.user?.userId) {
        return res.status(409).json({ message: "User already exists with this email" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user?.userId, 
      req.body, 
      { new: true, runValidators: true }  
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while updating profile" });
  }
};

const logout = async (req: Request, res: Response): Promise<any> => {
  try{
      res.clearCookie('refreshToken')
      res.status(200).json({message: "Logout successful"})
  } catch(error) {
      console.log(error)
      res.status(500).json({message: "Error while logging out"})
  }
}


export {
  userProfile,
  signupUser,
  signinUser,
  logout,
  updateProfile
}