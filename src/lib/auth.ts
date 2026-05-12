import { AuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";



export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type:"password"},
            },
            async authorize(credentials) {
                await connectDb();
                const email = credentials?.email;
                const password = credentials?.password;

                if(!email || !password) {
                    throw new Error("Email or password not found")
                }

                const user = await User.findOne({ email });

                if(!user) {
                    throw new Error("User not found")
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch) {
                    throw new Error("Incorrect password")
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email:user.email,
                };

            },
        }),
        
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                
            }
            return token
            },
            async session({token, session}) {
                if(token) {
                    session.user.id = token.id as string;
                    session.user.name = token.name;
                    session.user.email = token.email;
                }
                return session;
            },

        },
    
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXT_AUTH_SECRET,

};