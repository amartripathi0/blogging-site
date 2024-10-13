import { motion } from "framer-motion";
import { BlogType } from "@amartripathi/blog-types";
import { ArrowRight, Pen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
export default function BlogCard({
  blog,
  pageType,
}: {
  blog?: BlogType;
  pageType: "homepageBlogPage" | "userBlogPage";
}) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const blogDate = new Date(blog?.date || "");
  const formattedDate = blogDate.toLocaleDateString("en-US", options);
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gradient-to-b from-indigo-950  to-slate-900  rounded shadow-sm overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-indigo-950"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={() =>
        navigate(`/blog/${blog?.id}`, {
          state: {
            pageType,
            blog,
          },
        })
      }
    >
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-blue-500 uppercase">
            {blog?.category}
          </span>
          <span className="text-sm text-gray-200">{formattedDate}</span>
        </div>
        <h2 className="text-xl font-semibold my-2 text-gray-100">
          {blog?.title}
        </h2>

        <p className="text-neutral-300 my-2 mb-4 line-clamp-4 text-ellipsis text-pretty h-24">
          {blog?.content}
        </p>
        <div
          className={cn(
            "flex items-center",
            pageType === "userBlogPage" ? "justify-between" : "justify-end"
          )}
        >
          {pageType === "userBlogPage" && (
            <motion.button
              className="text-blue-500 hover:text-blue-600 transition-colors duration-150 flex items-center text-sm font-semibold gap-1.5"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Edit <Pen size={15} />
            </motion.button>
          )}
          <motion.button
            className="text-blue-500 hover:text-blue-600 transition-colors duration-150 flex items-center text-sm font-semibold"
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
