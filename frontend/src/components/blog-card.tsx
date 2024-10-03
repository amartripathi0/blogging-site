import { motion } from "framer-motion";
import { BlogType }  from '@amartripathi/blog-types'
import { ArrowRight } from "lucide-react";
export default function BlogCard({ title, content } : Partial<BlogType>) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 ,}}
    >
      <div className="p-6">
        <span className="text-xs font-semibold text-purple-600 uppercase">
          {"post.category"}
        </span>
        <h2 className="text-xl font-semibold mt-2 mb-2 text-gray-800">
          {title}
        </h2>
        <p className="text-gray-600 mb-4">{content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{"post.date"}</span>
          <motion.button
            className="text-purple-600 flex items-center text-sm font-semibold"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Read More <ArrowRight className="ml-1 w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
