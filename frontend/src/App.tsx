import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import BlogsPage from "./pages/blogs";
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path = '/' element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<BlogsPage />} />
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
    </>
  );
}
