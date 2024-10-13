import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";

export default function FullScreenBlogCreator() {
  const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

  const [blogPost, setBlogPost] = useState({
    title: "",
    content: "",
    published: false,
    category: "Uncategorized",
    date: new Date().toISOString().split("T")[0],
  });

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

  const handleSubmit = () => {
    console.log("Blog post to be submitted:", blogPost);
    // Submit your data to the API here
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
    <div className="h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col py-24 px-52 text-white">
      <header className="border-b border-gray-700 mb-4">
        <div className="container mx-auto py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold mx-auto text-blue-400">
            Create New Blog Post
          </h1>
        </div>
      </header>

      <div className="flex items-center my-4">
        <Input
          name="title"
          value={blogPost.title}
          onChange={handleInputChange}
          placeholder="Enter your title here"
          className="text-3xl font-bold bg-transparent rounded border-gray-600  placeholder-gray-500"
        />
      </div>

      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={blogPost.published}
              onCheckedChange={(checked) =>
                setBlogPost((prev) => ({ ...prev, published: checked }))
              }
              name="published"
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <Select
            value={blogPost.category}
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

          <Input
            type="date"
            name="date"
            value={blogPost.date}
            onChange={handleInputChange}
            className="border border-gray-600 rounded bg-gray-800 text-white"
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="rounded bg-blue-600 hover:bg-blue-500 transition duration-200"
        >
          Publish
        </Button>
      </div>

      <main className="flex-grow container mx-auto pt-4 flex flex-col space-y-4">
        <div className="flex-grow">
          <Editor
            apiKey={TINYMCE_API_KEY}
            onEditorChange={handleContentChange}
            init={textEditorConfig}
          />
        </div>
      </main>
    </div>
  );
}
