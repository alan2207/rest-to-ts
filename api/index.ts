import { serve } from "@hono/node-server";
import { Hono, type Context, type Next } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { bearerAuth } from "hono/bearer-auth";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { decode, sign } from "hono/jwt";
import { COMMENTS, POSTS, USERS, USER_PASSWORD } from "./data";

const app = new Hono<{
  Variables: {
    user: (typeof USERS)[number];
  };
}>();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello World!");
});

// mirror endpoint to test the generated types
// it will return the id and the query params that are provided in the request url
app.get("/mirror/:id", async (c) => {
  // Get query parameters
  const url = new URL(c.req.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  // Build response object
  const responseData = {
    id: c.req.param("id"),
    ...(Object.keys(queryParams).length > 0 && { queryParams }),
  };

  // Set a new cookie
  setCookie(c, "visited", "true", {
    path: "/",
  });

  // Set response headers
  c.header("X-Custom-Header", "custom-value");

  return c.json(responseData);
});

app.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  if (!USERS.find((user) => user.email === email)) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }

  if (password !== USER_PASSWORD) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }

  const exp = Math.floor(Date.now() / 1000) + 60 * 60;

  const payload = {
    email,
    exp,
  };

  const token = await sign(payload, "secret");
  setCookie(c, "token", token, {
    httpOnly: true,
    expires: new Date(exp * 1000),
  });
  return c.json({
    payload,
    token,
  });
});

app.use(
  "/*",
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === getCookie(c, "token");
    },
  })
);

// pass the user to the context
async function passUser(c: Context, next: Next) {
  const token = c.req.header("Authorization")?.split(" ")[1];
  const decoded = decode(token as string);
  const userEmail = decoded.payload.email;
  c.set(
    "user",
    USERS.find((user) => user.email === userEmail)
  );
  await next();
}

app.use("/*", passUser);

app.get("/posts", async (c) => {
  const user = c.get("user");

  return c.json(POSTS.filter((post) => post.authorId === user.id));
});

app.get("/posts/:id", (c) => {
  const user = c.get("user");

  const post = POSTS.find((post) => post.id === +c.req.param("id"));
  if (!post) {
    throw new HTTPException(404, { message: "Post not found" });
  }

  if (post.authorId !== user.id) {
    throw new HTTPException(403, { message: "Forbidden" });
  }

  return c.json(post);
});

app.get("/posts/:id/comments", (c) => {
  return c.json(
    COMMENTS.filter((comment) => comment.postId === +c.req.param("id"))
  );
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
