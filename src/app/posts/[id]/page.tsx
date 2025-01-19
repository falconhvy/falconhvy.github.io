export default function PostPage({ params }: { params: PostPageParams }) {
  return (
    <div>
      <article className="pb-10 pt-5">
        <h1 className="mb-3 text-2xl font-semibold tracking-tight">Hello, world!</h1>
        <p className="text-sm text-neutral-600">Jan 1, 2025</p>
      </article>
      <div>{params.id}</div>
    </div>
  );
}

export async function generateStaticParams(): Promise<PostPageParams[]> {
  return [{ id: "hello-world" }];
}

interface PostPageParams {
  id: string;
}
