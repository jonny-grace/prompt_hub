import { connectToDb } from "@utils/database";
import Prompt from "@model/prompt";

export const GET = async (req, { params }) => {
    console.log(params.id)
    try {
        await connectToDb()

        const prompts = await Prompt.find({ creator: params.id }).populate('creator');
        console.log()
        return new Response(JSON.stringify(prompts), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}