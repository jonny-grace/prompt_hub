import Prompt from "@model/prompt"
import { connectToDb } from "@utils/database"

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDb()
        const newPromt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        await newPromt.save()
        console.log(newPromt)
        return new Response(JSON.stringify(newPromt), { status: 201 })
    } catch (err) {
        return new Response('Failed to create a new prompt', { status: 500 })
    }
}