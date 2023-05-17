import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

export const POST = async(req,res) =>{
    const {userId , prompt, tag} = await req.json();

    try {
        await connectToDB(); //we need to connect to db everytime before it is a lamda function in nextjs and it is going to die after use
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status:201})

    } catch (err) {
        console.log(err);
        return new Response("failed to create new prompt ",{status:500})
    }

}