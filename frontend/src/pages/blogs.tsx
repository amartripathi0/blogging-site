import BlogCard from "@/components/blog-card";
import { BlogType } from "@amartripathi/blog-types";
import { motion } from "framer-motion";

export default function BlogsPage({
  blogsRef,
  blogsArray,
}: {
  blogsArray: BlogType[];
  blogsRef?: React.MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={blogsRef}
      className="-z-10 flex flex-col min-h-screen bg-gradient-to-br bg-neutral-900 p-8 px-52 pt-28"
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Latest Blog Posts
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogsArray.map(({ title, content, date, category, id }) => (
          <BlogCard
            key={id}
            title={title}
            content={content}
            date={date}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
