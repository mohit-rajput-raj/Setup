import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

import { OpenRouter } from "@openrouter/sdk";

import { generateText } from "ai";
const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});
const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const antropic = createAnthropic();
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "axecute/hello.ai" },
  async ({ event, step }) => {
    // Sentry.logger.warn("Rate limit reached for endpoint");
    const {steps}  = await step.ai.wrap("gemni-generate-text",generateText,
      {
        model:google("gemini-2.5-flash"),
        system:"you a helpfull assistent",
        prompt:"2+34",
        experimental_telemetry: {
    isEnabled: true,
    recordInputs: true,
    recordOutputs: true,
  },
      }
    )
    return steps
  }
);
