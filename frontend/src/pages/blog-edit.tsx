import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";
import { createBlogInput, updateBlogInput } from "@amartripathi/blog-types";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "lucide-react";

interface BlogCreatorAndEditorProps {
  pageType: "createBlog" | "editBlog";
}
export default function BlogCreatorAndEditor({ pageType } : BlogCreatorAndEditorProps) {
  const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { id : blogId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogPost, setBlogPost] = useState({
    title: "",
    content: "",
    published: false,
    category: "Uncategorized",
    date: new Date().toISOString().split("T")[0],
  });
  
  useEffect(() => {
    async function getBlog() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/${blogId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setBlogPost(response.data?.blog || {});
      } catch (error: unknown) {
        const errorMessage =
          (error as AxiosError)?.response?.data || "An error occurred";
        toast.error(`${errorMessage}`);
      }
    }
    if (pageType === "editBlog") {
      getBlog();
    }
  }, [pageType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setBlogPost((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (content: string) => {
    setBlogPost((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if(pageType === 'createBlog') {
      const parseResult = createBlogInput.safeParse(blogPost);
  
      if (parseResult.error) {
        toast.error("Please provide valid inputs!");
        setIsLoading(false);
      } else {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            `${BACKEND_URL}/api/v1/blog`,
            blogPost,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.status === 201) {
            setIsLoading(false);
            const blogId = response?.data.blog.id;
            toast.success(`Blog successfully created `, {
              action: {
                label: "View",
                onClick: () => {
                  navigate(`/user/blog/${blogId}`);
                },
              },
              duration: 6000,
            });
          }
  
          // setBlogs(response.data?.blogs || []);
        } catch (error: unknown) {
          setIsLoading(false);
          const errorMessage =
            (error as AxiosError)?.response?.data || "An error occurred";
          toast.error(`${errorMessage}`);
        }
      }

    }
    else if (pageType === 'editBlog' ) {
        const parseResult = updateBlogInput.safeParse({
          title: blogPost?.title,
          content: blogPost?.content,
          published: blogPost?.published,
          category: blogPost?.category,
          id: blogId,
        });

        if (parseResult.error) {          
          toast.error("Please provide valid inputs!");
          setIsLoading(false);
        } else {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title: blogPost?.title,
                content: blogPost?.content,
                published: blogPost?.published,
                category: blogPost?.category,
                id: blogId,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            console.log("response",response);
            
            if (response.status === 201) {
              setIsLoading(false);
              const blogId = response?.data.blog.id;
              toast.success(`Blog successfully updated `, {
                action: {
                  label: "View",
                  onClick: () => {
                    navigate(`/user/blog/${blogId}`);
                  },
                },
                duration: 6000,
              });
            }
          } catch  {
            setIsLoading(false);
            toast.error(`Server Error`);
          }
        }
    }
  };

  const textEditorConfig = {
    height: 370,
    menubar: false,
    content_style: `
                  body {
                    background-color: #1e1e1e;
                    color: #ffffff;
                  }
                  h1, h2, h3, h4, h5, h6 {
                    color: #ffffff;
                  }
                  a {
                    color: #1e90ff;
                  }
                  .mce-toolbar, .mce-statusbar {
                    background-color: #2d2d2d;
                    border: none;
                  }
                  .mce-content-body {
                    background-color: #1e1e1e;
                    color: #ffffff;
                  }
                  .mce-edit-area {
                    background-color: #1e1e1e;
                  }
                  .mce-textbox, .mce-select, .mce-listbox {
                    background-color: #2d2d2d;
                    color: #ffffff;
                    border: 1px solid #444;
                  }
                `,
  };

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col py-24 px-52 text-white">
      <header className="border-b border-gray-700 mb-4">
        <div className="container mx-auto py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold mx-auto text-blue-400">
            {pageType === "editBlog"
              ? "Blog Edit Page"
              : "Create New Blog Post"}
          </h1>
        </div>
      </header>
      {isLoading && (
        <div className=" absolute h-5/6 w-4/5  backdrop-blur-sm  left-40 z-10 flex justify-center items-center   text-3xl text-blue-500 italic font-semibold">
          <div className="text-blue-400 flex gap-2">
            <p>
              {" "}
              {pageType === "editBlog" ? "Editing" : "Publishing"} Your Blog...
            </p>
            <Loader className="animate-spin" size={35} />
          </div>
        </div>
      )}
      <div className="flex items-center my-4">
        <Input
          name="title"
          value={blogPost.title}
          onChange={handleInputChange}
          placeholder="Enter your title here..."
          className="text-2xl h-12 font-bold rounded border-gray-600 placeholder:text-neutral-200"
        />
      </div>

      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          {/* <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={blogPost.published}
              onCheckedChange={(checked) =>
                setBlogPost((prev) => ({ ...prev, published: checked }))
              }
              name="published"

            />
            <Label htmlFor="published">Published</Label>
          </div> */}

          <Select
            value={blogPost?.category}
            onValueChange={(value) =>
              setBlogPost((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="w-[160px] rounded border border-gray-600 bg-gray-800">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border border-gray-600">
              {["Uncategorized", "Technology", "Lifestyle", "Travel"].map(
                (category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          {pageType === "editBlog" ? (
            <p>{blogPost?.date}</p>
          ) : (
            <Input
              type="date"
              name="date"
              value={blogPost?.date}
              onChange={handleInputChange}
              className="border border-gray-600 rounded bg-gray-800 text-white"
            />
          )}
        </div>
        <Button
          onClick={handleSubmit}
          className="rounded bg-blue-600 hover:bg-blue-500 transition duration-200 flex gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" size={18} /> Publishing
            </>
          ) : pageType === "editBlog" ? (
            "Edit"
          ) : (
            "Publish"
          )}
        </Button>
      </div>

      <main className="flex-grow container mx-auto pt-4 flex flex-col space-y-4">
        <div className="flex-grow">
          <Editor
            apiKey={TINYMCE_API_KEY}
            onEditorChange={handleContentChange}
            init={textEditorConfig}
            value={blogPost?.content}
          />
        </div>
      </main>
    </div>
  );
}
