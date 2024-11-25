import { type ConfigWithAuth, type EndpointConfig } from "../lib/types";

// Sometimes, an endpoint will return different response properties depending on the user data.
// In this case, you can provide different configurations for different users,
// and the script will generate the types merged together with all the properties.

export const USER1_CONFIG: ConfigWithAuth = {
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
      variations: [
        {
          url: "http://localhost:3000/posts/1",
        },
      ],
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
