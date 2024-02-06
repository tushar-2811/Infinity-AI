import {  SignUpSchema } from "@/validators/auth";
import { NextRequest , NextResponse } from "next/server";


export async function POST(request: NextRequest) {
     try {
        const body = request.body;       
        console.log(body);

        return NextResponse.json({
            body
        })
   
     } catch (error) {
        console.log("error in sign-up" , error);
        return new NextResponse("error in sign-up" , {status : 500});
     }
}