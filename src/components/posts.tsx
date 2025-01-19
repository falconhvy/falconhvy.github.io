import Link from "next/link";
import { formatDate } from "@/utils/date";

export default function Posts() {
  const posts = [
    { id: "3", title: "Hello, world!", createdAt: new Date() },
    { id: "2", title: "Hello, world!", createdAt: new Date() },
    { id: "1", title: "Hello, world!", createdAt: new Date() },
  ];

  return (
    <section>
      <ul>
        {posts.map(post => (
          <PostListItem key={post.id} id={post.id} title={post.title} createdAt={post.createdAt} />
        ))}
      </ul>
    </section>
  );
}

function PostListItem(props: PostListItemProps) {
  return (
    <li>
      <Link href={"/"} className="flex flex-row py-2">
        <p className="w-[100px] tracking-tight text-neutral-600">{formatDate(props.createdAt)}</p>
        <p>{props.title}</p>
      </Link>
    </li>
  );
}

interface PostListItemProps {
  id: string;
  title: string;
  createdAt: Date;
}
