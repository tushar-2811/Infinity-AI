import { NextResponse } from 'next/server';
import  OpenAI  from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';


const openai = new OpenAI({
    apiKey : process.env.OPEN_API_KEY
});

const instructionMessage: ChatCompletionMessageParam = {
    role : "system",
    content : "You are a code debugger. You must answer only in markdown code snippets. Use code comments for explanations"
}



export async function POST(req: Request) {
     try {
        const body = await req.json();
        const {messages} = body;

        if(!openai.apiKey) {
            return new NextResponse("Open API keys are not configured" , {
                status : 500
            })
        }
         
        if(!messages) {
            return new NextResponse("Messages are required" , {
                status : 400
            })
        }

        const response = await openai.chat.completions.create({
            model : "gpt-3.5-turbo",
            messages : [instructionMessage , ...messages]
        })


        return NextResponse.json(response.choices[0].message);

        
     } catch (error) {
         console.log("code error->" , error);
         return new NextResponse("Internal error" , {status : 500});
     }
}