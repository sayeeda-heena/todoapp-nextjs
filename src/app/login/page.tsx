'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
 
function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    

    const handleLogin = async () => {
        try{
            setLoading(true);
            
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if(res?.ok) {
                toast.success("Logged In");
                router.push("/dashboard");
                
            }else{
                toast.error("Invalid credentails");
                return;
                console.log("Login Failed")
                
            }

        }catch(error) {
            toast.error(`Something went wrong: ${error}`);
     }finally{
        setLoading(false);
     }
    }
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[380px] p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl"
      >

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-400 text-sm mt-2">
          Login to continue managing your tasks
        </p>

        {/* FORM */}
        <div className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-blue-500"
          />

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Logging in..." : "Sign In"}
          </motion.button>

        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </motion.div>
    </main>
    
  );
}

export default Login
