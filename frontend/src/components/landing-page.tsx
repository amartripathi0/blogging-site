import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
 

  return (
    <div className="-z-10 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white pt-10">
      <main
        className="container mx-auto px-4 flex flex-col justify-center items-center text-center "
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <motion.h1
          className="text-4xl md:text-8xl font-bold bg-gradient-to-b from-white to-blue-300 bg-clip-text text-transparent pb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Blogs and Blogs
        </motion.h1>
        <motion.p
          className="text-xl md:text-xl mb-12 max-w-2xl text-neutral-200 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Discover insightful articles, expert opinions, and cutting-edge ideas
          from industry leaders.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <a href="/blogs">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 rounded"
            >
              Explore Our Content <ArrowDown className="ml-2" />
            </Button>
          </a>
        </motion.div>
      </main>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-400 rounded-full opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -100],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}