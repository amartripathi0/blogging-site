import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";
import Footer from "./components/footer";
import User from "./pages/user";
import { BlogPost } from "./components/blogpost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/blog/:id" element={<BlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
