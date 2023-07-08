import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'
import { NextResponse } from "next/server";

export const GET = async(req,{params}) =>{

    try {
        
        await connectToDB();
        const id = params.id;
        const prompts = await Prompt.find({creator:id}).populate('creator');

        return NextResponse.json(prompts,{status:200})

    } catch (err) {
        console.log(err)
        return NextResponse.json({message:"failed to get prompts"},{status:500})
    }

}