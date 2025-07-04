// import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
// import OpenAI from "openai";
import { Completions } from "openai/resources/completions.mjs";
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// export async function generateSummaryFromOpenAI(pdfText: string){
// try{const response = await openai.chat.completions.create({
//     model: "gpt-4.1",
//     messages: [
//         {
//             role: "system",
//             content: SUMMARY_SYSTEM_PROMPT
//         },
//         {
//             role: "user",
//             content: `Transform this document into an engaging , easy to read summary using emojis:\n\n${pdfText}`,
//         },
//     ],
//     temperature: 0.7,
//     max_tokens: 1500,
// });

// return response.choices[0].message.content;
// } catch(error:any){
//     if(error?.status === 429){
//         throw new Error("Rate limit exceeded");
//     }
// }
// }

// ✅ Section 1: openai.ts

import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let lastRequestTime = 0;
const MIN_TIME_BETWEEN_REQUESTS = 1200; // 1.2 seconds

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateSummaryFromOpenAI(pdfText: string) {
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (timeSinceLast < MIN_TIME_BETWEEN_REQUESTS) {
    await wait(MIN_TIME_BETWEEN_REQUESTS - timeSinceLast);
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary using emojis:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    lastRequestTime = Date.now();
    const result = response.choices[0].message.content;

    if (!result || result.trim().length < 50) {
      throw new Error("OpenAI returned an invalid or empty summary");
    }

    return result;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("Rate limit exceeded");
    }
    console.error("OpenAI error:", error);
    throw error;
  }
}
