import AuthPage from "@/components/auth-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signinInput } from "@amartripathi/blog-types";
import { useState } from "react";
import { toast } from "sonner";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parseResult = signinInput.safeParse({ email, password });

    if (parseResult.error) toast.error("Invalid input for signin");
    else {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parseResult.data),
        });

        if (!response.ok) {
          toast.error("Internal Server Error");
        }
        const data = await response.json();
        console.log(data);
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
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </AuthPage>
  );
}
