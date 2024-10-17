import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PenIcon } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem('token')
    navigate("/signin");
    toast.success('Logged out!')
  }
  function renderAuthButtons() {
    switch (true) {
      case pathname === "/":
      case pathname.startsWith("/blog"):
        return (
          <>
            <a href="/signin">
              <Button
                variant="ghost"
                className="text-white bg-blue-500 hover:text-blue-900 hover:bg-blue-400 rounded"
              >
                Sign In
              </Button>
            </a>
            <a href="/signup">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded">
                Sign Up
              </Button>
            </a>
          </>
        );
      case pathname === "/signin":
        return (
          <a href="/signup">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded">
              Sign Up
            </Button>
          </a>
        );
      case pathname === "/signup":
        return (
          <a href="/signin">
            <Button
              variant="ghost"
              className="text-white bg-blue-500 hover:text-blue-900 hover:bg-blue-400 rounded"
            >
              Sign In
            </Button>
          </a>
        );
      case pathname.startsWith("/user/blog/"):
        return (
          <div className="flex gap-4">
            <Link to={"/user/blogs"} className="w-full">
              <Button
                variant="ghost"
                className="w-full text-white bg-blue-600  hover:bg-blue-500 rounded"
              >
                Dashboard
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-white bg-neutral-900 rounded p-2  w-44 border-neutral-600">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem className="hover:bg-neutral-700 ">
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-neutral-700 ">
                  Email@Email.com
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    className="w-full text-white bg-blue-500 hover:text-blue-900 hover:bg-blue-400 rounded"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      default:
        return (
          <div className="flex gap-4">
            <Link to="/user/blog/create-blog">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded flex gap-2">
                Write a Blog <PenIcon size={14} />
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-white bg-neutral-900 rounded p-2 border-neutral-600 w-44">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem className="hover:bg-neutral-700 ">
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-neutral-700 ">
                  Email@Email.com
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    className="w-full text-white bg-blue-500 hover:text-blue-900 hover:bg-blue-400 rounded"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
    }
  }

  return (
    <motion.nav
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed w-screen top-4 z-10 backdrop-blur-sm"
    >
      <div className="container w-4/5 mx-auto px-4 py-3 flex justify-between items-center bg-white bg-opacity-10 rounded shadow-sm ">
        <a href="/" className="flex items-center space-x-2">
          <svg
            className="h-8 w-8 mr-3"
            color="#2563eb "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <h1 className="text-xl font-bold text-white">
            Blogs <span className="text-blue-500"> and </span> Blogs
          </h1>
        </a>
        <div className="flex space-x-2">{renderAuthButtons()}</div>
      </div>
    </motion.nav>
  );
}
