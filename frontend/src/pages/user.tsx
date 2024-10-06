import BlogsPage from "@/components/blogs";
import { homepageBlogPosts } from "@/lib/constant";
import { BlogType } from "@amartripathi/blog-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function User() {
  const [blogs, setBlogs] = useState<BlogType[]>();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(BACKEND_URL);

  async function getUsersBlogs() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/blogs`, {
        headers: {
          "Authorization": token,
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
  return <div>{blogs && <BlogsPage blogsArray={homepageBlogPosts} title="My Blogs" pageType="userBlogPage"/>}</div>;
}

export default User;
