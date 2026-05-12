import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ITodo extends Document {
    title: string;
    description?:string;
    completed: boolean;
    priority: "Low" | "Medium" | "High";
    dueDate?: string;
    createdAt?: string;
    updatedAt?: string;
    userId: string;
}

const todoSchema = new Schema<ITodo>({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: String,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    
},{timestamps:true});

const Todo = models.Todo || model<ITodo>("Todo", todoSchema)
export default Todo;
