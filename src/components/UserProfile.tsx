"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

export default function UserProfile() {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <div
      className="relative"
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >

      {/* PROFILE ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-400 border border-white/20 flex items-center justify-center backdrop-blur-md hover:bg-white/50 transition"
      >
        👤
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl p-4 shadow-2xl z-50"
          >

            {/* USER INFO */}
            <div>
              <h3 className="font-semibold text-white">
                {session.user.name}
              </h3>

              <p className="text-sm text-gray-400 mt-1 break-all">
                {session.user.email}
              </p>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-white/10 my-3" />

            {/* LOGOUT */}
            <button
              onMouseDown={() => setOpen(false)}
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              className="w-full rounded-xl bg-red-500/20 hover:bg-red-500/30 transition px-4 py-2 text-sm text-white"
            >
              Logout
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}