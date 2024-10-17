import BlogsPage from "@/components/blogs-page";
import { Button } from "@/components/ui/button";
import { BlogType } from "@amartripathi/blog-types";
import axios, { AxiosError } from "axios";
import { Loader, PenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function User() {
  const [blogs, setBlogs] = useState<BlogType[]>();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  async function getUsersBlogs() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/blogs`, {
        headers: {
          Authorization: token,
        },
      });

      setBlogs(response.data?.blogs || []);
    } catch (error: unknown) {
      const errorMessage = (error as AxiosError)?.response?.data || "An error occurred";
      toast.error(`${errorMessage}, Please signin!`);
      navigate('/signin');
    }
  }

  useEffect(() => {
    getUsersBlogs();
  }, []);

  return blogs ? (
    blogs.length > 0 ? (
      <BlogsPage blogsArray={blogs} title="My Blogs" pageType="userBlogPage" />
    ) : (
      <div className="flex flex-col gap-4 h-screen justify-center items-center bg-neutral-900 text-blue-400 text-xl">
        <p> You don't have a blog!</p>
        <Link to="/user/blog/create-blog">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded flex gap-2">
            Write a Blog <PenIcon size={14} />
          </Button>
        </Link>
      </div>
    )
  ) : (
    <div className="flex flex-col gap-5 h-screen justify-center items-center bg-neutral-900 text-blue-400 text-xl">
      <p> Fetching Your Blogs...</p>
      <Loader className="animate-spin" size={40} />
    </div>
  );
}

export default User;
