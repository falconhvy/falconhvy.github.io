import Link from "next/link";
import { formatDate } from "@/utils/date";

export default function PostList(props: PostListProps) {
  return (
    <section>
      <ul>
        {props.posts.map(post => (
          <PostListItem key={post.id} id={post.id} title={post.title} createdAt={post.createdAt} />
        ))}
      </ul>
    </section>
  );
}

interface PostListProps {
  posts: PostListItemProps[];
}

function PostListItem(props: PostListItemProps) {
  return (
    <li>
      <Link href={`/posts/${props.id}`} className="flex flex-row py-2">
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
