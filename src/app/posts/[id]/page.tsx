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

export async function generateMetadata({ params }: { params: Promise<PostPageParams> }) {
  const { id } = await params;
  const { title } = Posts.get(id) ?? notFound();

  return {
    title: `${title} — falconhvy`,
  };
}

export async function generateStaticParams(): Promise<PostPageParams[]> {
  const posts = Posts.getAll();

  // 빈 결과를 반환하면 빌드 에러가 발생하므로, 빈 배열 대신 특정 값을 반환합니다.
  if (!posts || posts.length === 0) {
    return [{ id: "not-found" }];
  }

  return posts.map(({ id }) => ({ id }));
}

interface PostPageParams {
  id: string;
}
