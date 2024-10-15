import BlogCard from "@/components/blog-card";
import { BlogType } from "@amartripathi/blog-types";
import { motion } from "framer-motion";
import PageWrapper from "./page-wrapper";

export default function BlogsPage({
  blogsPageRef,
  blogsArray,
  title,
  pageType,
}: {
  blogsArray: BlogType[];
  title?: string;
  blogsPageRef?: React.MutableRefObject<HTMLElement | null>;
  pageType: "homepageBlogPage" | "userBlogPage";
}) {
  return (
    <PageWrapper
      innerRef={blogsPageRef}
      additionalStyles="-z-10 flex flex-col items-center min-h-screen bg-gradient-to-b to-black from-indigo-800"
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-blue-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogsArray.map((blog) => (
          <BlogCard blog={blog} key={blog.id} pageType={pageType} />
        ))}
      </div>
    </PageWrapper>
  );
}
