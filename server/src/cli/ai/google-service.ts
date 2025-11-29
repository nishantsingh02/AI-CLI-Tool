import {google} from "@ai-sdk/google"
import { streamText } from "ai";
import chalk from "chalk";
import { config } from "../../config/google.config.js";

export class AIService {
    private model: any;

    constructor() {
        if(!config.googleApiKey) {
            throw new Error("GOOGLE_API_KEY is missing")
        }

        // api key is come from .env only
        
        // this.model = google(config.model, {
        //     apiKey: config.googleApiKey
        // })

        this.model = google(config.model)
    }

    async sendMessage(messages: any, onchunk: any, tools = undefined, onToolCall = null) {
        try {
            const streamConfig = {
                model: this.model, // which model you want to use 
                messages: messages, // What input messages to process
            }
            // we get the response in words or chunks not full response at once
            const result = streamText(streamConfig);

            let fullResponse = ""

            for await (const chunk of result.textStream) {
                fullResponse += chunk; // we start adding the response on the final output
                // shows the response live in the CLI
                if(onchunk) {
                    onchunk(chunk)
                }
            }

            const fullResult = result;

            return {
                content: fullResponse,
                finishResponse: fullResult.finishReason,
                usgae: fullResult.usage
            }

        } catch(error: any) {
            console.error(chalk.red("AI SERVICE ERROR: "), error.message)
            throw error;
        }
    }

    // for non-streaming response 
    async getMessage(messages: any, tools = undefined) {
        let fullResponse = ""

        await this.sendMessage(messages, (chunk: any) => {
            fullResponse += chunk
        })

        return fullResponse
    }

}