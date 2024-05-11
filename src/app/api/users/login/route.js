import { NextResponse } from "next/server";
import { connectDb } from "@/dbConnection/db";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDb();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        if(!email || !password){
            return NextResponse.json({error: "Please provide all the required fields first!"});
        }

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User doesnot exist with this email or Provide correct email!"}, {status: 400});
        }

        //check if password is correct or not
        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
   
        return response; //it will send message with cookie
    }

    catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

}
