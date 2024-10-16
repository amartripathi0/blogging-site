import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";
import Footer from "./components/footer";
import User from "./pages/user";
import { BlogPost } from "./components/blogpost";
import BlogCreatorAndEditor from "./pages/blog-edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/blogs" element={<User />} />
          <Route path="/user/blog/:id" element={<BlogPost />} />
          <Route
            path="/user/blog/create-blog"
            element={<BlogCreatorAndEditor pageType="createBlog" />}
          />
          <Route
            path="/user/blog/edit-blog/:id"
            element={<BlogCreatorAndEditor pageType="editBlog" />}
          />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function Layout() {
  return (
    <main className="bg-neutral-800 text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
