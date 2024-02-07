import { NextResponse } from 'next/server';
import  OpenAI  from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';


const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

const instructionMessage: ChatCompletionMessageParam = {
    role : "system",
    content : "You are a legal advisor. You must answer based on Indian laws and Indian high court and supreme court judgements."
}



export async function POST(req: Request) {
     try {
        const body = await req.json();
        const {prompt , amount = 1 , resolution = "512x512"} = body;

        if(!openai.apiKey) {
            return new NextResponse("Open API keys are not configured" , {
                status : 500
            })
        }
         
        if(!prompt) {
            return new NextResponse("Prompt is required" , {
                status : 400
            })
        }

        if(!amount) {
            return new NextResponse("Amount is required" , {
                status : 400
            })
        }

        if(!resolution) {
            return new NextResponse("Resolution is required" , {
                status : 400
            })
        }

        const response = await openai.images.generate({
            prompt , 
            n: parseInt(amount , 10),
            size : resolution
        });


        return NextResponse.json(response.data);
        
     } catch (error) {
         console.log("image eror error->" , error);
         return new NextResponse("Internal error" , {status : 500});
     }
}