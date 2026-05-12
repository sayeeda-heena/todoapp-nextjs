"use client";

import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "@/redux/todoSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  Todo,
  TodoInput,
} from "@/types/todo";
import toast from "react-hot-toast";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const { todos, loading } =
    useAppSelector((state) => state.todos);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState<"Low" | "Medium" | "High">(
      "Medium"
    );

  const [dueDate, setDueDate] =
    useState("");

  const [editId, setEditId] = useState<
    string | null
  >(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // SAVE TODO
  const handleSave = async () => {
    if (!title.trim()) return;

    const todoData: TodoInput = {
      title,
      description,
      priority,
      dueDate,
    };
    

    if (editId) {
      await dispatch(
        updateTodo({
          id: editId,
          todoData,
        })
      );
      toast.success("Todo added successfully");

    } else {
      await dispatch(addTodo(todoData));
      toast.success("Todo added successfully");
    }

    resetForm();
  };

  // RESET
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setEditId(null);
  };

  // COMPLETE
  const toggleComplete = async (
    todo: Todo
  ) => {
    await dispatch(
      updateTodo({
        id: todo._id,
        todoData: {
          completed: !todo.completed,
        },
      })
    );
  };

  // DELETE
  const handleDelete = async (
    id: string
  ) => {
    await dispatch(deleteTodo(id));
    toast.success("Todo deleted");
  };
  

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black p-6 text-white">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold">
            Todo Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Organize your work beautifully ✨
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6 mb-8"
        >
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Todo title..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-black/30 outline-none"
            />

            <textarea
              placeholder="Description..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-black/30 outline-none"
            />

            <div className="flex gap-4">

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value as
                      | "Low"
                      | "Medium"
                      | "High"
                  )
                }
                className="p-4 rounded-2xl bg-black/30"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                className="p-4 rounded-2xl bg-black/30"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl font-bold"
            >
              {editId
                ? "Update Todo"
                : "Add Todo"}
            </button>
          </div>
        </motion.div>

        {/* TODOS */}
        {loading ? (
          <div className="text-center">
            Loading...
          </div>
        ) : todos.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center text-gray-400">
            No todos yet 🚀
          </div>
        ) : (
          <AnimatePresence>
          <div className="space-y-5">
            {todos.map((todo: Todo) => (
              <motion.div
                key={todo._id}
                initial={{opacity: 0, y: 20, scale: 0.95,}}
                animate={{opacity: 1, y: 0, scale: 1, }}
                exit={{opacity: 0, x: 100, scale: 0.8, }}
                transition={{duration: 0.3,}}
                layout
                className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-5 flex justify-between items-start"
              >
                {/* LEFT */}
                <div>

                  <h2
                    className={`text-2xl font-bold ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {todo.title}
                  </h2>

                  <p className="text-gray-300 mt-2">
                    {todo.description ||
                      "No description"}
                  </p>

                  <div className="flex gap-3 mt-4">

                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-sm">
                      {todo.priority}
                    </span>

                    {todo.dueDate && (
                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-sm">
                        {todo.dueDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 items-center">

                  <button
                    onClick={() =>
                      toggleComplete(todo)
                    }
                   
                    className="h-9 w-9 rounded-xl bg-green-500/20 hover:bg-green-500/40 transition text-sm"
                  >
                    ✓
                  </button>

                  <button
                    onClick={() => {
                      setEditId(todo._id);

                      setTitle(todo.title);

                      setDescription(
                        todo.description || ""
                      );

                      setPriority(
                        todo.priority
                      );

                      setDueDate(
                        todo.dueDate || ""
                      );
                    }}
                    className="px-3 h-9 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm"
                    
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(todo._id)
                    }
                    className="px-3 h-9 rounded-xl bg-red-500/20 hover:bg-red-500/40 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}