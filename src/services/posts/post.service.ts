import { Post } from "@/services/posts/post.model";

export default abstract class PostService {
  protected readonly posts: readonly Post[];

  constructor() {
    const allPosts = this.initialize();

    // 1. filter out hidden posts
    // 2. sort by created date desc
    this.posts = allPosts.filter(post => !post.hidden).toSorted(this.compareByDateDesc);

    console.info(`${allPosts.length} posts found, ${this.posts.length} loaded except hidden posts`);
  }

  /**
   * Return all posts to initialize
   */
  abstract initialize(): Post[];

  /**
   * Retrieve a post by id
   *
   * @param id Post ID
   * @return Post if found, otherwise null
   */
  get(id: string): Post | null {
    return this.posts.find(post => post.id === id) || null;
  }

  /**
   * Retrieve all posts
   *
   * @return All posts (if none, empty array)
   */
  getAll(): Post[] {
    return [...this.posts];
  }

  private compareByDateDesc(postA: Post, postB: Post): number {
    return postB.createdAt.getTime() - postA.createdAt.getTime();
  }
}
