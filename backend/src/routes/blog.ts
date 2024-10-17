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

    const { title, content, published , category , date }  = body.data
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published,
        category,
      },
    });

    return c.json({ blog }, 201);
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
blogRouter.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = updateBlogInput.safeParse(await c.req.json());
    if (!body.success)
      return c.json({ message: "Please provide valid data" }, 400);

    const { title, content, id, category , published }: UpdateBlogInput = body.data;
    const authorId = c.get("userId");

    
    const blog = await prisma.post.update({
      where: {
        id,
        authorId
      },
      data: {
        title,
        content,
        category,
        published,
      },
    });

    return c.json({ blog }, 201);
  } catch (error) {
    // console.log(error);
    return c.json({ message: "Server Error" }, 500);
  }
});

blogRouter.get("/blogs", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const authorId = c.get("userId");

    const blogs = await prisma.post.findMany({
      where : {
        authorId
      }
    });
    
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

blogRouter.delete("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { id } = await c.req.param();
    const blog = await prisma.post.delete({
      where: {
        id,
      },
    });

    return c.json({ message: "Blog deleted successfully" }, 202);
  } catch (error) {
    return c.json({ message: "Server Error" }, 500);
  }
});
