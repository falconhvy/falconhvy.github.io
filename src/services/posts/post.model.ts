interface PostMetadata {
  id: string;
  title: string;
  createdAt: Date;
  hidden: boolean;
}

export interface Post extends PostMetadata {
  bodyHtml: string;
}
