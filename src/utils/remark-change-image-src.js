import { visit } from "unist-util-visit";
import path from "node:path";
import { POST_ASSETS_DIR } from "@/utils/constants";
import { getIdFromFilePath } from "@/utils/markdown";

export default function remarkChangeImageSrc(options) {
  const { mdFilePath, rootDirPath } = options;

  if (typeof mdFilePath !== "string" || !mdFilePath) {
    throw new Error("mdFilePath must be provided");
  }

  if (typeof rootDirPath !== "string" || !rootDirPath) {
    throw new Error("rootDirPath must be provided");
  }

  return tree => {
    visit(tree, "image", node => {
      node.url = getNewImageSrcFromPostId(node.url, mdFilePath, rootDirPath);
    });
  };
}

function getNewImageSrcFromPostId(oldImageSrc, mdFilePath, rootDirPath) {
  let upperPathExceptFileName = path.dirname(mdFilePath);
  if (upperPathExceptFileName.startsWith(rootDirPath)) {
    upperPathExceptFileName = upperPathExceptFileName.slice(rootDirPath.length);
  }

  const postId = getIdFromFilePath(mdFilePath);
  const imageBasePath = path.join(
    "/",
    POST_ASSETS_DIR,
    postId === "index" ? path.join(upperPathExceptFileName, postId) : upperPathExceptFileName,
  );

  return path.resolve(imageBasePath, oldImageSrc);
}
