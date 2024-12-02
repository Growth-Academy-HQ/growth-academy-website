import { motion } from 'framer-motion';

export function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-ga-black flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 text-center"
      >
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-ga-white/20 border-t-ga-white rounded-full"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-8 h-8 bg-ga-white/10 rounded-full backdrop-blur-sm" />
          </motion.div>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-ga-white/80 font-alata text-lg"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
}