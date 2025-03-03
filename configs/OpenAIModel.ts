import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { tripPlanSchema } from "./props/zod";


// add EXPO_PUBLIC_OPENAI_API_KEY in .env
const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

export async function generateTrip(userPrompt: string) {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            { role: "user", content: userPrompt },
        ],
        response_format: zodResponseFormat(tripPlanSchema, "userTrip"),
    });

    const userTrip = completion.choices[0].message.parsed;
    return userTrip;
    // console.log(userTrip);
}