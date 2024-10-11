import LandingPage from "@/components/landing-page";
import BlogsPage from "../components/blogs";
import { useRef } from "react";
import { homepageBlogPosts } from "@/lib/constant";

export default function Homepage() {
  const blogsRef = useRef<HTMLDivElement | null>(null);
    
  return (
    <main className="bg-indigo-900">
      <LandingPage blogsRef={blogsRef} />
      <BlogsPage
        blogsRef={blogsRef}
        blogsArray={homepageBlogPosts}
        title="Our Latest Blog Posts"
        pageType="homepageBlogPage"
      />
    </main>
  );
}
