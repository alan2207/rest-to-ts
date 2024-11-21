import { type EndpointConfig } from "./types";

export const CONFIG: EndpointConfig[] = [
  {
    outputPath: "./generated-types/posts.ts",
    rootName: "Post",
    variations: [
      {
        url: "http://localhost:3000/posts",
        headers: {
          Authorization: "Bearer token1",
        },
      },
    ],
  },
  {
    outputPath: "./generated-types/comments.ts",
    rootName: "Comment",
    variations: [
      {
        url: "http://localhost:3000/posts/1/comments",
        headers: {
          Authorization: "Bearer token2",
        },
      },
    ],
  },
  {
    outputPath: "./generated-types/mirror.ts",
    rootName: "Mirror",
    variations: [
      {
        url: "http://localhost:3000/mirror/123",
        cookies: {
          sessionId: "123",
        },
      },
      {
        url: "http://localhost:3000/mirror/456?query=test",
        cookies: {
          token: "456",
        },
      },
      {
        url: "http://localhost:3000/mirror/789?query=test&page=1&limit=10",
      },
    ],
  },
];
