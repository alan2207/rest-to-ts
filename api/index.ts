import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello World!");
});

const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

const comments = [
  { id: 1, title: "Comment 1", postId: 1 },
  { id: 2, title: "Comment 2", postId: 1 },
  { id: 3, title: "Comment 3", postId: 2 },
];

app.get("/posts", (c) => {
  return c.json(posts);
});

app.get("/posts/:id", (c) => {
  return c.json(posts.find((post) => post.id === +c.req.param("id")));
});

app.get("/posts/:id/comments", (c) => {
  return c.json(
    comments.filter((comment) => comment.postId === +c.req.param("id"))
  );
});

app.get("/mirror/:id", async (c) => {
  // Get cookies from the request
  const cookies: Record<string, string> = {};
  const cookieHeader = c.req.header("cookie");
  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookies[name] = value;
    });
  }

  // Get query parameters
  const url = new URL(c.req.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  // Get all request headers
  const headers: Record<string, string> = {};
  c.req.raw.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // Build response object
  const responseData = {
    id: c.req.param("id"),
    ...(Object.keys(queryParams).length > 0 && { queryParams }),
    ...(Object.keys(cookies).length > 0 && { cookies }),
    ...(Object.keys(headers).length > 0 && { headers }),
  };

  // Set a new cookie
  setCookie(c, "visited", "true", {
    path: "/",
  });

  // Set response headers
  c.header("X-Custom-Header", "custom-value");

  return c.json(responseData);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
