import Profile from "@/components/profile";
import PostList from "@/components/post-list";
import Posts from "@/services/posts";

export default function Home() {
  const posts = Posts.getAll();

  return (
    <div>
      <Profile />
      <PostList posts={posts} />
    </div>
  );
}
