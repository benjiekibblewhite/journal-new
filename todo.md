# TODO

- case-insensitive email
- check if user can access post: turn into middleware
- pagination for posts (SELECT \* FROM posts LIMIT <limit> OFFSET <limit \* pageNum>)
- emoji tags

```
SELECT id, posts.title, t.tag_array
FROM posts
JOIN(
	SELECT pt.post_id AS id, ARRAY_AGG(t.tag) AS tag_array
	FROM posts_to_tags pt
	JOIN tags t ON t.id = pt.tag_id
	GROUP BY pt.post_id
) t USING (id);
```

- consider using an ORM like sequelize, especially as this will help with things like migrations
