import BlogCard from "@/components/blog-card";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: "1",
    title: "The Future of Web Development",
    content: "Exploring upcoming trends and technologies shaping the web.",
    published: true,
    authorId: "1",
  },
  {
    id: "2",
    title: "Mastering React Hooks",
    content: "A deep dive into React's powerful hook system.",
    published: true,
    authorId: "1",
  },
  {
    id: "3",
    title: "Design Systems: A Comprehensive Guide",
    content: "Learn how to create and implement effective design systems.",
    published: true,
    authorId: "1",
  },
  {
    id: "4",
    title: "The Art of Productive Coding",
    content: "Tips and tricks to boost your coding productivity.",
    published: true,
    authorId: "1",
  },
  {
    id: "5",
    title: "Accessibility in Modern Web Apps",
    content:
      "Ensuring your web applications are accessible to all users. nsuring your web applications are accessible to all users.nsuring your web applications are accessible to all users.nsuring your web applications are accessible to all users.",
    published: true,
    authorId: "1",
  },
  {
    id: "6",
    title: "Serverless Architecture Explained",
    content:
      "Understanding the benefits and challenges of serverless computing.",
    published: true,
    authorId: "1",
  },
];

export default function BlogsPage() {
  return (
    <div className="-z-10 flex flex-col min-h-screen bg-gradient-to-br bg-neutral-900 p-8 px-52 ">
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Latest Blog Posts
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map(({ title, content }, index) => (
          <BlogCard key={index} title={title} content={content} />
        ))}
      </div>
    </div>
  );
}
