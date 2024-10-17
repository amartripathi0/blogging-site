import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, User, Tag } from "lucide-react";
import { BlogType } from "@amartripathi/blog-types";
import axios, { AxiosError } from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function BlogPost() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [blog, setBlog] = useState<BlogType>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  async function getBlog() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(blog);

      if (response.data?.blog !== null) setBlog(response.data?.blog);
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      const errorMessage =
        (error as AxiosError)?.response?.data || "An error occurred";
      toast.error(`${errorMessage}`);
      navigate("/signin");
    }
  }

  useEffect(() => {
    if (state?.pageType === "homepageBlogPage") {
      setBlog(state?.blog);
    } else {
      getBlog();
    }
  }, [state]);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-neutral-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl font-bold"
        >
          Loading...
        </motion.div>
      </div>
    );
  }
  if (!blog && !isLoading) {
    return (
      <div className="h-screen w-full bg-neutral-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl font-bold"
        >
          The Blog doesn't exists!
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-900 to-neutral-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Card className="w-full max-w-4xl mx-auto bg-neutral-800 text-white shadow-2xl relative rounded mt-24 border-neutral-700">
        <CardHeader className="relative">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -top-20 left-[48%] transform -translate-x-1/2 bg-blue-600 rounded-full p-4 shadow-lg"
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl font-bold text-center mt-8 mb-4"
          >
            {blog?.title}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-4 text-sm text-neutral-400 mt-4"
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {blog && new Date(blog?.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {blog && `${Math.ceil(blog.content.length / 200)} min read`}
            </div>
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              <Badge variant="secondary" className="bg-blue-600 text-white">
                {blog?.category}
              </Badge>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="mt-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {blog && <div dangerouslySetInnerHTML={{ __html: blog.content }} />}
          </motion.div>
        </CardContent>
      </Card>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-12 text-center text-neutral-400"
      >
        <p>Thank you for reading!</p>
      </motion.div>
    </div>
  );
}
