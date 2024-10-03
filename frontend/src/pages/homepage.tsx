import LandingPage from "@/components/landing-page";
import BlogsPage from "./blogs";
import Footer from "@/components/footer";

export default function Homepage() {
  return (
    <main>
        <LandingPage/>
        <BlogsPage/>
        <Footer />
    </main>
  )
}

