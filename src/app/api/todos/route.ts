import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";
import Todo from "@/models/Todo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try{
  await connectDb(); 
    const session = await getServerSession(authOptions);
     
    if(!session?.user?.id || !session) {
        return NextResponse.json(
            {message: "Unauthorized"},
            {status: 401}
        );
    }

    
    const todos = await Todo.find({
      userId: session.user.id,
    }).sort({ createdAt: -1}).lean();
   
    return NextResponse.json({todos},{status: 200});

   }catch {
     return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
   }
   }

export async function POST(req: NextRequest){
    try{
         await connectDb();
         const session = await getServerSession(authOptions);
       
         if (!session?.user?.id || !session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
   const body = await req.json();
    const { title, description, priority, dueDate } = body;
      console.log(body);
    const todo = await Todo.create({
        title,
        description,
        priority,
        dueDate,
        completed: false,
       userId: session?.user?.id,
     }
     );
       
     return NextResponse.json({todo}, {status: 201})
   
    }catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
