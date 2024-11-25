export const USERS = [
  {
    id: 1,
    email: "testuser1@example.com",
    firstName: "John",
    lastName: "Doe",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    email: "testuser2@example.com",
    firstName: "Jane",
    lastName: "Doe",
  },
];

export const USER_PASSWORD = "password";

// posts with different variations of properties:
export const POSTS = [
  { id: 1, title: "Post 1", description: "Post 1 description", authorId: 1 },
  { id: 2, title: "Post 2", authorId: 2, tag: "tag1" },
  { id: 3, title: "Post 3", authorId: 1 },
  { id: 4, title: "Post 4", authorId: 2 },
  { id: 5, title: "Post 5", authorId: 1 },
];

// comments with different variations of properties:
export const COMMENTS = [
  { id: 1, title: "Comment 1", postId: 1, authorId: 1 },
  { id: 2, title: "Comment 2", postId: 1, authorId: 2, isFeatured: true },
  { id: 3, title: "Comment 3", postId: 2, authorId: 1 },
];
