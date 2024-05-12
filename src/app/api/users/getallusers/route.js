import { NextResponse } from "next/server";
import { connectDb } from "@/dbConnection/db";
import User from "@/models/userModel";

connectDb();

export async function GET(request){
    try{
        const users = await User.find({}, 'username');
        return NextResponse.json({data: users});

    } catch(error){
        return NextResponse.json({error: "Getting error while fetching all users!"}, {status: 400})
    }
}
