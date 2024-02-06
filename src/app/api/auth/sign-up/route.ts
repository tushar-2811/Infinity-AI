import prismadb from "@/lib/prismadb";
import {  SignUpSchema } from "@/validators/auth";
import { NextRequest , NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(request: NextRequest , {params} : any) {
     try {
       const body =  await request.json();
       const parsedInput = SignUpSchema.safeParse(body);

       // validation
       if(!parsedInput.success){
         return NextResponse.json({
            ok : false ,
            msg : "data validation error",
            error : parsedInput.error
         } , {status : 500})
       }

       // check if there is an existing user
       const existingUserByEmail = await prismadb.user.findUnique({
         where : {
            email : body.email
         }
       })

       if(existingUserByEmail){
         return NextResponse.json({
            ok : false,
            msg : "Email already exist",
         } , {status : 501})
       }

       const existingUserByPhoneNO = await prismadb.user.findUnique({
         where : {
            phoneNo : body.phoneNo
         }
       })

       if(existingUserByPhoneNO) {
         return NextResponse.json({
            ok : false,
            msg : "Phone NO. already exist"
         } , {status : 501})
       }


       // Now , create a new user

       const hashedPassword = await bcrypt.hash(body.password , 12);

       const newUser = await prismadb.user.create({
           data : {
             name : body.name,
             email : body.email,
             phoneNo : body.phoneNo,
             gender : body.gender,
             hashedPassword : hashedPassword,
             walletActivated : false
           }
       })

       return NextResponse.json({
         ok : true,
         msg : "new user created",
         user : {
            name : newUser.name,
            id : newUser.id
         }
       } , {status : 201})

   
     } catch (error) {
        console.log("error in sign-up" , error);
        return NextResponse.json({
          ok : false,
          msg : "error in sign-up",
          error
        } , {status : 401})
     }
}