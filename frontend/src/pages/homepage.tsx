import LandingPage from "@/components/landing-page";
import BlogsPage from "../components/blogs-page";
import { useRef } from "react";
import { homepageBlogPosts } from "@/lib/constant";

export default function Homepage() {
  const blogsPageRef = useRef<HTMLElement | null>(null);

  return (
    <main className="bg-indigo-800">
      <LandingPage blogsPageRef={blogsPageRef} />
      <BlogsPage
        blogsPageRef={blogsPageRef}
        blogsArray={homepageBlogPosts}
        title="Our Latest Blog Posts"
        pageType="homepageBlogPage"
      />
    </main>
  );
}
