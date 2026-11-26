-- SQL query examples for the blog database (PostgreSQL)

-- 1. Create a user
INSERT INTO users (username, email, password_hash)
VALUES ('alex', 'alex@example.com', 'replace-with-a-secure-password-hash')
RETURNING user_id;

-- 2. Create a post (replace 1 with an existing user_id)
INSERT INTO posts (user_id, title, body, status)
VALUES (1, 'My First Post', 'This is the content of my first blog post.', 'published')
RETURNING post_id;

-- 3. Add a comment (replace IDs with existing IDs)
INSERT INTO comments (post_id, user_id, comment_text)
VALUES (1, 1, 'Great post!');

-- 4. Read all published posts with their authors
SELECT p.post_id, p.title, p.body, p.created_at, u.username AS author
FROM posts AS p
JOIN users AS u ON u.user_id = p.user_id
WHERE p.status = 'published'
ORDER BY p.created_at DESC;

-- 5. Read a post and all its comments with commenter names
SELECT p.title, c.comment_text, c.created_at, u.username AS commenter
FROM posts AS p
LEFT JOIN comments AS c ON c.post_id = p.post_id
LEFT JOIN users AS u ON u.user_id = c.user_id
WHERE p.post_id = 1
ORDER BY c.created_at;

-- 6. Update a post
UPDATE posts
SET title = 'Updated Blog Title',
    body = 'Updated content',
    updated_at = CURRENT_TIMESTAMP
WHERE post_id = 1;

-- 7. Delete a comment
DELETE FROM comments WHERE comment_id = 1;

-- 8. Count comments for each post
SELECT p.post_id, p.title, COUNT(c.comment_id) AS comment_count
FROM posts AS p
LEFT JOIN comments AS c ON c.post_id = p.post_id
GROUP BY p.post_id, p.title
ORDER BY comment_count DESC;

-- 9. List users and number of posts they have authored
SELECT u.user_id, u.username, COUNT(p.post_id) AS post_count
FROM users AS u
LEFT JOIN posts AS p ON p.user_id = u.user_id
GROUP BY u.user_id, u.username
ORDER BY post_count DESC;
