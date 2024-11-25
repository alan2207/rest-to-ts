import { getAuthToken } from "../lib/auth";
import { type ConfigWithAuth, type EndpointConfig } from "../lib/types";

// example of a static config
export const MIRROR_CONFIG: EndpointConfig = {
  outputPath: "./generated-types/mirror.ts",
  rootName: "Mirror",
  variations: [
    {
      url: "http://localhost:3000/mirror/123",
    },
    {
      url: "http://localhost:3000/mirror/456?query=test",
    },
    {
      url: "http://localhost:3000/mirror/789?query=test&page=1&limit=10",
    },
  ],
};

// Sometimes, an endpoint will return different response properties depending on the user data.
// In this case, you can provide different configurations for different users,
// and the script will generate the types merged together with all the properties.

// example of dynamic config
export const getUser1Config = async (): Promise<ConfigWithAuth> => {
  const token = await getAuthToken({
    email: "testuser1@example.com",
    password: "password",
  });

  const postsResponse = await fetch("http://localhost:3000/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: `token=${token}`,
    },
    credentials: "include",
  });

  const posts = await postsResponse.json();

  const postsVariations = posts.map((post: any) => ({
    url: `http://localhost:3000/posts/${post.id}`,
  }));

  return {
    credentials: {
      email: "testuser1@example.com",
      password: "password",
    },
    config: [
      {
        outputPath: "./generated-types/user.ts",
        rootName: "User",
        variations: [
          {
            url: "http://localhost:3000/user",
          },
        ],
      },
      {
        outputPath: "./generated-types/posts.ts",
        rootName: "Post",
        variations: postsVariations,
      },
      {
        outputPath: "./generated-types/comments.ts",
        rootName: "Comment",
        variations: [
          {
            url: "http://localhost:3000/posts/1/comments",
          },
        ],
      },
    ],
  };
};

// example of a static config for a different user
export const USER2_CONFIG: ConfigWithAuth = {
  credentials: {
    email: "testuser2@example.com",
    password: "password",
  },
  config: [
    {
      outputPath: "./generated-types/user.ts",
      rootName: "User",
      variations: [
        {
          url: "http://localhost:3000/user",
        },
      ],
    },
    {
      outputPath: "./generated-types/posts.ts",
      rootName: "Post",
      variations: [
        {
          url: "http://localhost:3000/posts/2",
        },
      ],
    },
  ],
};
