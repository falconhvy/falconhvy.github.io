import Posts from "@/services/posts";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/date";

export default function PostPage({ params }: { params: PostPageParams }) {
  const { title, createdAt, bodyHtml } = Posts.get(params.id) ?? notFound();

  return (
    <div>
      <article className="pb-10 pt-5">
        <h1 className="mb-3 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-neutral-600">{formatDate(createdAt)}</p>
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} className="prose mt-10 break-words" />
      </article>
    </div>
  );
}

export async function generateStaticParams(): Promise<PostPageParams[]> {
  return Posts.getAll().map(({ id }) => ({ id }));
}

interface PostPageParams {
  id: string;
}
