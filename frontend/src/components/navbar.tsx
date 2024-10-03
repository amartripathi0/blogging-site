import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="fixed w-screen top-4">
      <div className="container w-4/5 mx-auto px-4 py-3 flex justify-between items-center  backdrop-blur-md bg-white bg-opacity-10 rounded shadow-md">
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/placeholder.svg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-white">Blogs and Blogs</span>
        </a>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            className="text-white bg-blue-500 hover:text-blue-200 hover:bg-white/10 rounded"
          >
            Sign In
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}