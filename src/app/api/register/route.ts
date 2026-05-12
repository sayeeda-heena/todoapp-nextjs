import connectDb from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        await connectDb();
        const body = await req.json();
        const {name, email, password} = body;
    
        
         if (!name || !email || !password) {
      return Response.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }
        const existUser = await User.findOne({email});

        if(existUser) {
            return NextResponse.json(
                {message: "User already exists"},
                {status: 400}

            )
        }
        if(password.length < 6) {
            return NextResponse.json(
                {message: "Password must be atleast 6 characters"},
                {status: 400}

            )

        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create(
            {name,email,password:hashedPassword}
        );

        return NextResponse.json(
           { user, message: "Registered sucessfully"},
            {status: 201}
        )
    }catch(error) {
        return NextResponse.json(
           { message: `Server error: ${error}`},
            {status: 500}
        )}

}

