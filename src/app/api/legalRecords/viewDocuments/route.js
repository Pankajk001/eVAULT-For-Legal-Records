import Document from "@/models/documentModel";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request){
    try{
        const {userId} = await request.json();
        const documents = await Document.find({viewPermissions: userId});

        return NextResponse.json(documents);
    } catch(error){
        return NextResponse.json({error: "server error"}, {status: 500});
    }
}
