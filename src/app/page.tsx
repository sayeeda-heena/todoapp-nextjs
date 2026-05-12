"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full" />

      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">

        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-wide"
        >
          TaskFlow
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4"
        >
          <Link href="/login">
            <button className="px-5 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">
              Register
            </button>
          </Link>
        </motion.div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-20 gap-16">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 text-sm text-gray-300">
            ✨ Modern Productivity App
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Organize Your Tasks
            <span className="text-blue-500">
              {" "}
              Beautifully
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl">
           Organize your tasks with priorities,
            due dates, and a simple workflow that helps you stay focused and productive.
          </p>

          <div className="flex gap-4 mt-10">

            <Link href="/register">
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
              >
                Get Started
              </motion.button>
            </Link>

            <Link href="/login">
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="px-7 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition text-lg"
              >
                Login
              </motion.button>
            </Link>

          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >

          <div className="relative w-[350px] h-[500px]">

            {/* MAIN CARD */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-[40px] bg-white/10 border border-white/20 backdrop-blur-2xl p-6 shadow-2xl"
            >

              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold">
                  Today's Tasks
                </h2>

                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              </div>

              {/* TASKS */}
              <div className="space-y-4">

                {[
                  "Design Dashboard UI",
                  "Complete Redux Logic",
                  "Deploy Next.js App",
                  "Finish Portfolio",
                ].map((task, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.2,
                    }}
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />

                      <p className="text-sm">
                        {task}
                      </p>
                    </div>

                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20">
                      High
                    </span>
                  </motion.div>
                ))}

              </div>

              {/* BOTTOM STATS */}
              <div className="mt-10 grid grid-cols-2 gap-4">

                <div className="bg-white/10 rounded-xl p-3 border border-white/10 backdrop-blur-xl">
                  <p className="text-gray-400 text-xs">
                    Smooth Animations
                  </p>

                  <h3 className="text-sm font-semibold mt-1">
                    Framer Motion
                  </h3>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10 backdrop-blur-xl">
                  <p className="text-gray-400 text-xs">
                    Secure Auth
                  </p>

                  <h3 className="text-sm font-semibold mt-1">
                    NextAuth
                  </h3>
                </div>

              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}