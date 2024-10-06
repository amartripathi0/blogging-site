import BlogsPage from "@/components/blogs";
import { homepageBlogPosts } from "@/lib/constant";
import { BlogType } from "@amartripathi/blog-types";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function User() {
  const [blogs, setBlogs] = useState<BlogType[]>();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function getUsersBlogs() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/blogs`, {
        headers: {
          Authorization: token,
        },
      });

      setBlogs(response.data?.blogs);
    } catch {
      toast.error("Internal Server Error");
    }
  }
  useEffect(() => {
    getUsersBlogs();
  }, []);
  return blogs ? (
    <BlogsPage
      blogsArray={homepageBlogPosts}
      title="My Blogs"
      pageType="userBlogPage"
    />
  ) : (
    <div className="flex flex-col gap-5 h-screen justify-center items-center bg-neutral-900  text-blue-400 text-xl">
      <p> Fetching Your Blogs...</p>
      <Loader className="animate-spin" size={40} />
    </div>
  );
}

export default User;
