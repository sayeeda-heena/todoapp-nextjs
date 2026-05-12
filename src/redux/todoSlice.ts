import { Todo, TodoState } from "@/types/todo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoInput } from "@/types/todo";




const initialState: TodoState = {
    todos: [],
    loading: false,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const res = await axios.get("/api/todos");
    return res.data.todos;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todoData: TodoInput) => {
    const res = await axios.post("/api/todos", todoData);
    return res.data.todo;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: string) => {
    await axios.delete(`/api/todos/${id}`);
    return id;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", 
    async ({id, todoData}: {id: string, todoData: Partial<Todo>}) => {
        const res = await axios.patch(`/api/todos/${id}`,todoData);
        return res.data.todo;

    }
);

const slice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload;
        })

        .addCase(addTodo.fulfilled, (state, action) => {
            state.todos.unshift(action.payload);
        })

        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.todos = state.todos.filter((todo) => todo._id !== action.payload);
        })

        .addCase(updateTodo.fulfilled, (state, action) => {
            state.todos = state.todos.map((todo) =>
                 todo._id === action.payload._id ? action.payload : todo
        );
        });

    },
});

export default slice.reducer;