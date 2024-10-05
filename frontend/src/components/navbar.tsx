import { Button } from "./ui/button";
import { motion } from "framer-motion";
export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed w-screen top-4 z-10 backdrop-blur-sm"
    >
      <div className="container w-4/5 mx-auto px-4 py-3 flex justify-between items-center bg-white bg-opacity-10 rounded shadow-sm ">
        <a href="/" className="flex items-center space-x-2">
          <svg
            className="h-8 w-8 mr-3 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span className="text-xl font-bold text-blue-500">
            Blogs and Blogs
          </span>
        </a>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            className="text-white bg-blue-500 hover:text-blue-200 hover:bg-white/10 rounded"
          >
            Sign In
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded">
            Sign Up
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
