import { EndpointConfig } from "./types";

export const API_ENDPOINTS: EndpointConfig[] = [
  {
    url: "https://jsonplaceholder.typicode.com/posts",
    outputPath: "./types/posts.ts",
    rootName: "Post",
    headers: {
      Authorization: "Bearer ${process.env.API_TOKEN}",
    },
  },
  {
    url: "https://jsonplaceholder.typicode.com/posts/1/comments",
    outputPath: "./types/comments.ts",
    rootName: "Comment",
  },
  // Add more endpoints as needed
];
