import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";

export default function FullScreenBlogCreator() {
    const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

    const [blogPost, setBlogPost] = useState({
        title: '',
        content: '',
        published: false,
        category: 'Uncategorized',
        date: new Date().toISOString().split('T')[0],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, type, value, checked } = e.target as HTMLInputElement;
        setBlogPost(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleContentChange = (content: string) => {
        setBlogPost(prev => ({ ...prev, content }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Blog post to be submitted:', blogPost);
        // Here you would typically send the data to your API
    };

    return (
      <div className="h-screen bg-neutral-800 flex flex-col py-20 text-white px-24">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Create New Blog Post</h1>
          </div>
        </header>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex space-x-4 bg-g">
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={blogPost.published}
                onCheckedChange={(checked) =>
                  setBlogPost((prev) => ({ ...prev, published: checked }))
                }
                name="published"
                className='bg-red-200'
                
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <Select
              value={blogPost.category}
              onValueChange={(value) =>
                setBlogPost((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              name="date"
              value={blogPost.date}
              onChange={handleInputChange}
              className="w-auto"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="rounded bg-blue-600 hover:bg-blue-500"
          >
            Publish
          </Button>
        </div>
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col space-y-6 border">
          <div className="flex items-center space-x-4">
            <Input
              name="title"
              value={blogPost.title}
              onChange={handleInputChange}
              placeholder="Enter your title"
              className="text-4xl font-bold bg-transparent border-none shadow-none focus-visible:ring-0 p-0 w-full"
            />
          </div>
          <div className="flex-grow">
            <Editor
              apiKey={TINYMCE_API_KEY}
              onEditorChange={handleContentChange}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | styleselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | link image | \
                                preview code | help",
                content_style: `
                                * { 
                                    background-color: #1e1e1e; 
                                    color: #ffffff; 
                                }
                                .mce-toolbar, .mce-statusbar {
                                    background-color: #1e1e1e; 
                                    color: #ffffff; 
                                }
                                .mce-content-body {
                                    background-color: #1e1e1e; 
                                    color: #ffffff; 
                                }
                            `,
              }}
            />
          </div>
        </main>
      </div>
    );
}
