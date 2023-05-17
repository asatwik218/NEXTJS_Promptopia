import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

export const GET = async(req,res) =>{

    try {
        
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts),{status:200})

    } catch (err) {
        console.log(err)
        return new Response("failed to get prompts",{status:500})
    }

}