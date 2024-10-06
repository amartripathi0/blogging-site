import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    FROTEND_URL: string;
  };
}>();
app.use("/*", async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: [c.env.FROTEND_URL, "http://localhost:5173"],
    credentials: true,
  });
  return corsMiddlewareHandler(c, next);
});
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.get("/test", (c) => {
  return c.text("Server is up!");
});

export default app;
