import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthPage from "@/components/auth-page";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
    // Here you would typically handle the form submission
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
            placeholder="Enter your email"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </AuthPage>
  );
}
