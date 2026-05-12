"use client";

import { motion } from "framer-motion";
import UserProfile from "./UserProfile";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10 backdrop-blur-xl"
    >

      {/* LOGO */}
      <h1 className="text-xl font-bold tracking-wide">
        TaskFlow
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        <UserProfile />

      </div>
    </motion.nav>
  );
}
