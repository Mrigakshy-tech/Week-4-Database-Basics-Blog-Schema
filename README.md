# Week 4 – Database Basics: Blog Schema

## Assignment

Design a database schema for a blog containing users, posts, and comments. Provide SQL and MongoDB queries and submit the schema diagram.

This solution includes:

- An ER diagram (PNG) and Mermaid source.
- PostgreSQL table definitions with primary keys, foreign keys, constraints, and indexes.
- SQL examples for insert, select, joins, update, delete, and aggregation.
- MongoDB examples for insert, find, update, delete, aggregation, and indexes.

## 1. Database design

### Tables and relationships

**users**

- `user_id` – primary key
- `username` – unique username
- `email` – unique email
- `password_hash` – securely stored password hash
- `created_at` – account creation timestamp

**posts**

- `post_id` – primary key
- `user_id` – foreign key referencing `users.user_id`
- `title`, `body`, `status`, `created_at`, `updated_at`

**comments**

- `comment_id` – primary key
- `post_id` – foreign key referencing `posts.post_id`
- `user_id` – foreign key referencing `users.user_id`
- `comment_text`, `created_at`

### Relationships

1. One user can create many posts (1-to-many).
2. One user can write many comments (1-to-many).
3. One post can have many comments (1-to-many).

Each table has its own primary key. Foreign keys connect the tables and preserve referential integrity. Deleting a user deletes their posts and comments; deleting a post deletes its comments (`ON DELETE CASCADE`).

## 2. Schema diagram

See `diagrams/blog_schema.png`. The editable Mermaid source is in `diagrams/blog_schema.mmd`.

## 3. Run the SQL

Use PostgreSQL (for example, pgAdmin or the `psql` terminal):

1. Create a database named `blog_db`.
2. Open `sql/schema.sql` and execute it.
3. Open `sql/queries.sql` and execute the examples in order.
4. The sample inserts use IDs returned by earlier inserts; replace `1` with actual IDs if your database assigns different values.

## 4. Run the MongoDB examples

Use MongoDB Compass or `mongosh`:

1. Connect to your local or cloud MongoDB deployment.
2. Open `mongodb/blog_queries.js`.
3. Run the statements in order. The examples use references between collections (`userId` and `postId`).

## 5. SQL vs MongoDB design note

The relational SQL design uses foreign-key constraints to enforce relationships. MongoDB does not enforce foreign keys in the same way, so this example stores document references and uses application logic or aggregation `$lookup` when related data is needed. For a small blog, embedding a limited number of comments inside a post is another possible design, but separate comment documents scale better when posts can receive many comments.

## Project structure

```text
Week4_Database_Basics_Blog_Schema/
├── diagrams/
│   ├── blog_schema.png
│   └── blog_schema.mmd
├── mongodb/
│   └── blog_queries.js
├── sql/
│   ├── schema.sql
│   └── queries.sql
└── README.md
```
