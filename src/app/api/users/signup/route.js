import { connectDb } from "@/dbConnection/db";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

connectDb();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        if(!username || !email || !password){
            return NextResponse.json({error: "Please fill all the required fields first!"});
        }

        //check if user already exist or not based on email
        let user = await User.findOne({email});
        
        if(user){
            return NextResponse.json({error: "User with this email already exists"}, {status: 400})
        }
        
        //check if user already exist or not based on email
         user = await User.findOne({username});

         if(user){
            return NextResponse.json({error: "Username already exists!"})
         }

         
        console.log(reqBody);

         //hash password
         const salt = await bcryptjs.genSalt(10);
         const hashedPassword = await bcryptjs.hash(password, salt);

         //create new user
         const newUser = new User({
            username,
            email,
            password: hashedPassword
         })

         //save the user
         const savedUser = await newUser.save();
         console.log(savedUser);

         return NextResponse.json({
            message: "User created Successfully",
            success: true,
            savedUser
         })
    }

    catch(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
