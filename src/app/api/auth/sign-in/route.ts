import prismadb from "@/lib/prismadb";
import { SignInSchema } from "@/validators/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function POST(request : NextRequest) {
    try {
        const body = await request.json();
        const parsedInput = SignInSchema.safeParse(body);

        if(!parsedInput.success) {
            return NextResponse.json({
                ok : false,
                msg : "input validation failed",
                error : parsedInput.error.issues[0].message
            } , {status : 501})
        }

        // check is there exist an user by this email
        const existingUserByEmail = await prismadb.user.findUnique({
            where : {
                email : body.email
            }
        })

        if(!existingUserByEmail || existingUserByEmail.hashedPassword === null) {
            return NextResponse.json({
                ok : false,
                msg : "email doesn't exist",
            } , {status : 501})
        }

        const isUserValid = await bcrypt.compare(body.password , existingUserByEmail.hashedPassword);

        if(!isUserValid) {
            return NextResponse.json({
                ok : false,
                msg : "password is incorrect"
            } , {status : 501})
        }

        const jwtToken = jwt.sign({_id : existingUserByEmail.id} ,String( process.env.JWT_SECRET) , {expiresIn : '24h'});

        const response = NextResponse.json({
            ok : true,
            msg : "successful login",
            jwtToken : jwtToken,
            user : {
                name : existingUserByEmail.name,
                id : existingUserByEmail.id,
                email : existingUserByEmail.email,
                isWalletActivated : existingUserByEmail.walletActivated
            }
        } , {status : 201 });

        response.cookies.set("authToken" , jwtToken);
        return response;
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            ok : false,
            msg : 'error in sign-in',
            error : error
        } , {status  : 403})
    }
}