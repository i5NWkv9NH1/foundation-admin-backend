CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL, -- 假设 post_id 指向的是另一个表 posts 的主键
    parent_id INT REFERENCES comments(id) ON DELETE CASCADE,
    from_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    blocked BOOLEAN DEFAULT FALSE,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, comment_id)
);


WITH RECURSIVE CommentTree AS (
    -- 基本情况：选择所有顶层评论
    SELECT
        id,
        post_id,
        parent_id,
        from_id,
        content,
        blocked,
        deleted,
        CAST(id AS VARCHAR(255)) AS path,
        1 AS level
    FROM comments
    WHERE parent_id IS NULL OR parent_id = '0'

    UNION ALL

    -- 递归情况：选择所有回复，并构建路径
    SELECT
        c.id,
        c.post_id,
        c.parent_id,
        c.from_id,
        c.content,
        c.blocked,
        c.deleted,
        CONCAT(ct.path, '>', c.id) AS path,
        ct.level + 1 AS level
    FROM comments c
    INNER JOIN CommentTree ct ON c.parent_id = ct.id
)
SELECT
    *,
    (SELECT COUNT(*) FROM likes WHERE comment_id = CommentTree.id) AS like_count,
    (SELECT COUNT(*) FROM comments WHERE parent_id = CommentTree.id) AS reply_count
FROM CommentTree
ORDER BY path;
