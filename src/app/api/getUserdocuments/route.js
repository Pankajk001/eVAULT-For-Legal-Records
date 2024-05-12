import { connectDb } from "@/dbConnection/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Document from "@/models/documentModel";
connectDb();

export async function POST(request){
    const reqBody = await request.json();
    const {userId} = reqBody;

    try{
        const document = await Document.find({userId: userId});

        if(!document){
            return NextResponse.json({error: "No document found for this user id"})
        }

        return NextResponse.json(document);

    } 
    catch(error){
        return NextResponse.json({error: "server error"}, {status: 500})
    }
}
