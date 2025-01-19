import PostService from "@/services/posts/post.service";
import { Post } from "@/services/posts/post.model";
import { findMarkdownFilePaths, getIdFromFilePath, parseMarkdownFile } from "@/utils/markdown";

export default class MarkdownPostService extends PostService {
  private static readonly ROOT_DIR_PATH = "contents";

  override initialize(): Post[] {
    return findMarkdownFilePaths(MarkdownPostService.ROOT_DIR_PATH).map(filePath => {
      const id = getIdFromFilePath(filePath);

      const { frontMatter, bodyHtml } = parseMarkdownFile(filePath);
      const title = (frontMatter.title as string) ?? this.throwIfNull(filePath, "title");
      const createdAt = new Date(
        (frontMatter.createdAt as string) ?? this.throwIfNull(filePath, "createdAt"),
      );
      const hidden = (frontMatter.hidden as boolean) ?? false;

      return { id, title, createdAt, hidden, bodyHtml };
    });
  }

  private throwIfNull(filePath: string, field: string): never {
    throw new Error(`Field '${field}' does not exist in ${filePath}`);
  }
}
