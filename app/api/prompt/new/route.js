import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'
import { NextResponse } from "next/server";

export const POST = async(req) =>{
    const {userId , prompt, tag} = await req.json();

    try {
        await connectToDB(); //we need to connect to db everytime before it is a lamda function in nextjs and it is going to die after use
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return NextResponse.json(newPrompt,{status:201})

    } catch (err) {
        console.log(err);
        return NextResponse.json({message:"failed to create new prompt "},{status:500})
    }

}