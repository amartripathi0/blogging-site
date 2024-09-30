import { motion } from "framer-motion";

export default function Quote({quote ,author} : {quote : string, author ?: string}) {
  return (
    <motion.div
      className="w-full md:w-1/2 bg-indigo-600 p-8 flex flex-col justify-center relative overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-indigo-500 opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <blockquote className="text-white text-2xl font-light italic mb-4 relative z-10">
        {quote}
      </blockquote>
      <cite className="text-indigo-200 not-italic relative z-10">
        - {author}
      </cite>

      {/* Decorative Element */}
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-400 rounded-full opacity-50"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
}
