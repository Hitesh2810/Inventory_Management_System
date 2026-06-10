"use client";

import { motion } from "framer-motion";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-full max-w-xl rounded-2xl bg-[#07112d]/80 p-6 shadow-2xl border border-white/6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <div className="mt-4">{children}</div>
      </motion.div>
    </div>
  );
}
