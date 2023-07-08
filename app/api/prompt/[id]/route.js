import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'
import { NextResponse } from "next/server";

export const GET = async(req,{params}) =>{

    try {
        
        await connectToDB();
        const id = params.id;
        const prompt = await Prompt.findById(id).populate('creator');

        if(!prompt){
            return NextResponse.json({message:"prompt not found"},{status:404})
        }


        return NextResponse.json(prompt,{status:200})

    } catch (err) {
        console.log(err)
        return NextResponse.json({message:"failed to get prompt"},{status:404})
    }

}

export const PATCH = async(req,{params}) =>{
    const {prompt, tag } = await req.json();

    try {
        
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt){
            return NextResponse.json({message:"prompt not found"},{status:404})
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return NextResponse.json(existingPrompt,{status:200})


    } catch (err) {
        console.log(err)
        return NextResponse.json({message:"failed to update prompt"},{status:500})
    }
}

export const DELETE = async(req,{params}) =>{

    try {

        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return NextResponse.json({message:"prompt deleted successfully"},{status:200})
        
    } catch (err) {
        console.log(err)
        return NextResponse.json({message:"failed to delete prompt"},{status:500})
    }

}