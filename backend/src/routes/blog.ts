import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInput,
  updateBlogInput,
  UpdateBlogInput,
} from "@amartripathi/blog-types";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("*", async (c, next) => {
  try {
    const token = c.req.header("authorization")?.split(" ")[1] || "";
    const { id } = await verify(token, c.env.JWT_SECRET);

    if (id) {
      c.set("userId", id as string);
      await next();
    } else return c.json("Unauthorized Access", 403);
  } catch (error) {
    return c.json("Unauthorized Access", 403);
  }
});
blogRouter.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = createBlogInput.safeParse(await c.req.json());
    if (!body.success)
      return c.json({ message: "Please provide valid data" }, 400);

    const { title, content } = body.data
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return c.json({ blog }, 201);
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
blogRouter.put("", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = updateBlogInput.safeParse(await c.req.json());
    if (!body.success)
      return c.json({ message: "Please provide valid data" }, 400);

    const { title, content }: UpdateBlogInput = body.data;
    const authorId = c.get("userId");

    const blog = await prisma.post.update({
      where: {
        id: authorId,
      },
      data: {
        title,
        content,
      },
    });

    return c.json({ blog }, 201);
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});

blogRouter.get("/blogs", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();

    return c.json({ blogs });
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { id } = await c.req.param();
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    return c.json({ blog }, 200);
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
