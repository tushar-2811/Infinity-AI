import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prismadb from "./lib/prismadb";
import axios from "axios";

export async function middleware(request:NextRequest) {
     console.log("middleware executed");
     const authToken = request.cookies.get("authToken")?.value;


    //Signed-In users can't access sign-in and sign-up pages
    const pathsNotAccessBySignedInUsers = request.nextUrl.pathname === "/sign-in" || request.nextUrl.pathname === "/sign-up";

    if(pathsNotAccessBySignedInUsers){
        if(authToken){
            return NextResponse.redirect(new URL('/dashboard' , request.url));         
        }
    }else{
       if(authToken === undefined) {
          return NextResponse.redirect(new URL('/sign-in' , request.url));         
       }
    }

     console.log(authToken);

}


export const config = {
    matcher : [
        "/sign-up", 
        "/sign-in",
        "/dashboard",
        "/conversation",
        "/image",
        "/code",
        "/code-debug",
        "/wallet",
        "/settings"    
     ]
}