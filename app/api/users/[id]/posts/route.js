import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

export const GET = async(req,{params}) =>{

    try {
        
        await connectToDB();
        const id = params.id;
        const prompts = await Prompt.find({creator:id}).populate('creator');

        return new Response(JSON.stringify(prompts),{status:200})

    } catch (err) {
        console.log(err)
        return new Response("failed to get prompts",{status:500})
    }

}