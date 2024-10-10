import BlogCard from "@/components/blog-card";
import { BlogType } from "@amartripathi/blog-types";
import { motion } from "framer-motion";

export default function BlogsPage({
  blogsRef,
  blogsArray,
  title,
  pageType,
}: {
  blogsArray: BlogType[];
  title?: string;
  blogsRef?: React.MutableRefObject<HTMLDivElement | null>;
  pageType: "homepageBlogPage" | "userBlogPage";
}) {
  return (
    <div
      ref={blogsRef}
      className="-z-10 flex flex-col min-h-screen bg-gradient-to-br bg-neutral-900 p-8 px-52 pt-28"
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-blue-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogsArray.map((blog) => (
          <BlogCard blog={blog} pageType={pageType} />
        ))}
      </div>
    </div>
  );
}
