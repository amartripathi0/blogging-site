import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", (c) => {
  return c.text("signup route");
});
app.post("/api/v1/user/signin", (c) => {
  return c.text("signin route");
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
