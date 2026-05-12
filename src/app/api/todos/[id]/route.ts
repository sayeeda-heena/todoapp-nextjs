import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/db";
import Todo from "@/models/Todo";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function PATCH(
  req: Request,
  { params }: { params:Promise<{ id: string }> }
) {
  try {
  await connectDb();
  const body = await req.json();
   const {id} =  await params;
  const session = await getServerSession(authOptions);
  

  if(!session || !session?.user?.id) {
    return NextResponse.json(
       { message: "Unauthorized" },
      { status: 401 }
    );
    }

 const todo = await Todo.findByIdAndUpdate(
  id,
  {
    $set: body,
  },
  {returnDocument: "after"}
   
  );
 return Response.json({ todo });
} catch {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  {params}: { params: Promise<{ id: string }> }
) {
  try{
  await connectDb();
  const {id} = await params;
  
const session = await getServerSession(authOptions);
   

  if(!session || !session?.user?.id) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }

  

  const deleted =  await Todo.findByIdAndDelete({
  _id: id,
 userId: session.user.id,
});
  

   if (!deleted) {
      return NextResponse.json(
        { message: "Todo not found or not allowed" },
        { status: 404 }
      );
    }
 return Response.json({ message: "Deleted" });
}catch {
    return NextResponse.json(
      { message: "Server error" },
       { status: 500 });
  }
}