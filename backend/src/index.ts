import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/test", (c) => {
  return c.text("Server is up!");
});

app.post("/api/v1/user/signup", async (c) => {
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
        const token = await sign(email, c.env.JWT_SECRET);
        return c.json({ token }, 201);
      } else {
        return c.json({ message: "Error creating new user" }, 500);
      }
    }
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
app.post("/api/v1/user/signin", async (c) => {
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
      const token = await sign({ email }, c.env.JWT_SECRET);
      return c.json({ token }, 200);
    }
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
app.post("/api/v1/user/blog", (c) => {
  return c.text("blog route");
});
app.put("/api/v1/user/blog", (c) => {
  return c.text("blog route");
});
app.get("/api/v1/user/:id", (c) => {
  const userId = c.req.param("id");
  return c.json({ userId: userId });
});
app.get("/api/v1/blog/bulk", (c) => {
  return c.json({ blog: "blogs" });
});

export default app;
