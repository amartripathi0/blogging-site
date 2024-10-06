import LandingPage from "@/components/landing-page";
import BlogsPage from "./blogs";
import { useRef } from "react";

export default function Homepage() {
  const blogsRef = useRef<HTMLDivElement | null>(null);
  return (
    <main>
      <LandingPage blogsRef={blogsRef} />
      <BlogsPage blogsRef={blogsRef} />
    </main>
  );
}
