import { visit } from "unist-util-visit";
import path from "node:path";
import { POST_ASSETS_DIR } from "@/utils/constants";

export default function remarkChangeImageSrc(options) {
  const { postId } = options;

  if (typeof postId !== "string") {
    throw new Error("postId must be a string");
  }

  if (!postId) {
    throw new Error("postId must not be empty");
  }

  return tree => {
    visit(tree, "image", node => {
      node.url = getNewImageSrcFromPostId(postId, node.url);
    });
  };
}

function getNewImageSrcFromPostId(postId, oldImageSrc) {
  const basePath = path.resolve("/", POST_ASSETS_DIR, postId);
  return path.resolve(basePath, oldImageSrc);
}
