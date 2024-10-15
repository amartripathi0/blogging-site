import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SigninInput = z.infer<typeof signinInput>;

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  published : z.boolean(),
  category: z.string(),
  date: z.string().date(),
});
export type CreateBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;

export const blog = z.object({
  id: z.string(),
  title: z.string().min(4).max(60),
  content: z.string(),
  published: z.boolean().default(false),
  authorId: z.string(),
  category: z.string(),
  date: z.string().date(),
});

export type BlogType = z.infer<typeof blog>;
