// Week 4 Database Basics: MongoDB examples (mongosh)
// This version uses references: posts.userId -> users._id,
// comments.postId -> posts._id, comments.userId -> users._id.

// Select/create database

// use blog_db; try with this code line, if it shows error then go for the next two lines - const blogDb
const blogDb = db.getSiblingDB("blog_db");
db = blogDb;

// Example documents
db.users.insertOne({
  username: "alex",
  email: "alex@example.com",
  passwordHash: "replace-with-a-secure-password-hash",
  createdAt: new Date()
});

const author = db.users.findOne({ username: "alex" });

db.posts.insertOne({
  userId: author._id,
  title: "My First Post",
  body: "This is the content of my first blog post.",
  status: "published",
  createdAt: new Date(),
  updatedAt: new Date()
});

const post = db.posts.findOne({ title: "My First Post" });

db.comments.insertOne({
  postId: post._id,
  userId: author._id,
  commentText: "Great post!",
  createdAt: new Date()
});

// CREATE: add a new post
db.posts.insertOne({
  userId: author._id,
  title: "Another Post",
  body: "More blog content.",
  status: "draft",
  createdAt: new Date(),
  updatedAt: new Date()
});

// READ: all published posts
db.posts.find({ status: "published" }).sort({ createdAt: -1 });

// READ: comments for one post
db.comments.find({ postId: post._id }).sort({ createdAt: 1 });

// UPDATE: publish a draft post
db.posts.updateOne(
  { title: "Another Post", userId: author._id },
  { $set: { status: "published", updatedAt: new Date() } }
);

// DELETE: remove one comment
db.comments.deleteOne({ postId: post._id, userId: author._id });

// AGGREGATE: count comments per post
db.comments.aggregate([
  { $group: { _id: "$postId", commentCount: { $sum: 1 } } },
  { $sort: { commentCount: -1 } }
]);

// Indexes for common lookups
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });
db.posts.createIndex({ userId: 1 });
db.posts.createIndex({ status: 1, createdAt: -1 });
db.comments.createIndex({ postId: 1, createdAt: 1 });
db.comments.createIndex({ userId: 1 });
