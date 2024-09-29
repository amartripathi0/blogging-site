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

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, password, name } = await c.req.json();
    if (email && password) {      
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      console.log("existingUser" , existingUser);

      if (existingUser) {
        c.status(403);
        return c.json({ msg: "User already exists!" });
      } else {
        const user = await prisma.user.create({
          data: { email, password, name },
        });
        console.log(user);
        
        if (user) {
          const token = await sign(email, c.env.JWT_SECRET);
          return c.json({ token }, 200);
        } else {
          c.status(403);
          return c.json({ msg: "Error creating new user" });
        }
      }
    }
    else { 
     return c.json({"message" : "Please provide email and password"})
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});
app.post("/api/v1/user/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, password } = await c.req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
        password
      },
    });
    if (!user) {
      return c.json({ message: "User doesnt exists" });
    } else {
      if (user.password !== password) {
        return c.json({ message: "Incorrect Email or Password" });
      }
      const jwt = await sign({ email }, c.env.JWT_SECRET);
      return c.json({ jwt });
    }
  } catch (error) {
    throw new Error("Server Error");
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
