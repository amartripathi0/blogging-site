import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, password, name } = await c.req.json();
    if (!email || !password)
      return c.json({ message: "Please provide valid credentials" }, 400);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({ message: "User already exists!" }, 409);
    } else {
      const user = await prisma.user.create({
        data: { email, password, name },
      });
      if (user) {
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token }, 201);
      } else {
        return c.json({ message: "Error creating new user" }, 500);
      }
    }
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, password } = await c.req.json();

    if (!email || !password)
      return c.json({ message: "Please provide valid credentials" }, 400);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return c.json({ message: "User does not exist" }, 404);
    } else {
      if (user.password !== password) {
        return c.json({ message: "Incorrect Email or Password" }, 401);
      }
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ token }, 200);
    }
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
