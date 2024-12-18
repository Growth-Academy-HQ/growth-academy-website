import React from "react";
import { SchedulerForm } from "../components/scheduler";
import { motion } from "framer-motion";

export function SchedulerPage() {
  return (
    <div className="min-h-screen bg-ga-black pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-ga-white mb-4">Schedule Your Consultation</h2>
          <p className="text-ga-white/70 mb-8">
            Choose a time that works best for you to discuss your marketing strategy.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SchedulerForm />
        </motion.div>
      </div>
    </div>
  );
}

export default SchedulerPage; 