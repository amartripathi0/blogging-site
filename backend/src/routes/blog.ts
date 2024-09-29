import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post("", async (c) => {
  try {
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
blogRouter.put("", async (c) => {
  try {
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
blogRouter.get("/api/v1/user/:id", async (c) => {
  try {
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
blogRouter.get("/api/v1/blog/bulk", async (c) => {
  try {
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
