import Posts from "@/services/posts";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/date";
import Comment from "@/components/comment";

export default async function PostPage({ params }: { params: Promise<PostPageParams> }) {
  const { id } = await params;
  const { title, createdAt, bodyHtml } = Posts.get(id) ?? notFound();

  return (
    <div>
      <article className="pb-10 pt-5">
        <h1 className="mb-3 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-neutral-600">{formatDate(createdAt)}</p>
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} className="prose mt-10 break-words" />
      </article>
      <Comment />
    </div>
  );
}

export async function generateStaticParams(): Promise<PostPageParams[]> {
  return Posts.getAll().map(({ id }) => ({ id }));
}

interface PostPageParams {
  id: string;
}
