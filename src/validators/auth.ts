import {z} from 'zod'

export const SignUpSchema = z.object({
    name : z
            .string()
            .min(3 , {message : "Name cannot be too short !"} )
            .max(20 , {message : "Name cannot be too large!"}),
    email : z.string().email(),
    phoneNo : z
            .string()
            .min(10 , )
            .max(10 , )
            .refine((val) => !isNaN(val as unknown as number) , {message : "PhoneNo. should be a number"}),
    password : z.string().min(5 , {message : "Password is too short."}).max(255),
    confirmPassword : z.string().min(5 , {message : "Password is too short."}).max(255),
    gender : z.string()
})