import AuthPage from "@/components/auth-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signinInput } from "@amartripathi/blog-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parseResult = signinInput.safeParse({ email, password });

    if (parseResult.error) toast.error("Invalid input for signin");
    else {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parseResult.data),
        });

        if (!response.ok) {
          toast.error("Internal Server Error");
        } else {
          const { token } = await response.json();
          localStorage.setItem("token", token);
          navigate("/blogs");
        }
      } catch (error) {
        toast.error("Internal Server Error");
      }
    }
  };

  return (
    <AuthPage
      formHeading="Sign In"
      pageQuote="The greatest glory in living lies not in never falling, but in rising every time we fall."
      author="Nelson Mandela"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-gray-700 text-left">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-gray-700 text-left">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            autoComplete="on"
          />
        </div>
        <Button
          type="submit"
          className="w-full border rounded border-neutral-800 bg-blue-300 hover:bg-blue-400"
        >
          Sign in
        </Button>
      </form>
    </AuthPage>
  );
}
