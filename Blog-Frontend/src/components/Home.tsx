import api from "../axios/axiosInstance";
import { useState } from "react";
import { useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    api.get("/api/posts/", {
      withCredentials: true
    })
    .then(response => {
      setPosts(response.data);
    })
    .catch(error => {
      setError(error.message || 'Failed to fetch posts');
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>You are not logged in</div>;
  }
    return (
      <div>
      <h1>Latest Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <div>
          {posts.map(post => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* Add other post fields as needed */}
            </article>
          ))}
        </div>
      )}
    </div>
    );
}