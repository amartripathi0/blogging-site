import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthPage from "@/components/auth-page";
import { signupInput, SignupInput } from "@amartripathi/blog-types";


export default function Signup() {
  const [user, setUser] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = signupInput.safeParse(user);
      
    if (!res.success) {
      console.error("Invalid input for signup");
    } else {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };

  return (
    <AuthPage
      formHeading="Sign Up"
      pageQuote="The future belongs to those who believe in the beauty of their dreams."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-gray-700 text-left">
            Name
          </Label>
          <Input
            id="name"
            type="name"
            placeholder="Enter your name"
            required
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-gray-700 text-left">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </AuthPage>
  );
}
