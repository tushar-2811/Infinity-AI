import prismadb from "@/lib/prismadb";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

interface JwtPayload {
    _id : string
}

export async function GET(request: NextRequest){
    try {
      
       const authToken = request.cookies.get("authToken")?.value;

       if(!authToken) {
        return NextResponse.json({
            ok : false,
            msg : "Invalid auth Token",
            user: {}
        } , {status : 401})
       }


       const {_id}  = jwt.verify(authToken ,String(process.env.JWT_SECRET)) as JwtPayload;
      
       const existingUserById = await prismadb.user.findUnique({
        where : {
            id : _id
        }
       })

       if(!existingUserById) {
          return NextResponse.json({
            ok : false,
            msg : "user not found",
            user : {}
          } , {status : 401})
       }


       return NextResponse.json({
        ok : true,
        msg : "user found",
        user : {
            email : existingUserById.email
        }
       })
       
    } catch (error) {
        console.log("error in fetching user" , error);
        return NextResponse.json({
            ok : false,
            msg : "error in getting current-user",
            error
        } , {status : 500})
    }
}