import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'
import { NextResponse, NextRequest } from "next/server";

export const GET = async(req,res) =>{

    try {
        
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return NextResponse.json(prompts,{status:200})

    } catch (err) {
        console.log(err)
        return NextResponse.json({error:"failed to get prompts"},{status:500})
    }

}