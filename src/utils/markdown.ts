import fs from "node:fs";
import * as Path from "node:path";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkChangeImageSrc from "@/utils/remark-change-image-src";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * Find all markdown files under the directory
 *
 * @param dirPath Relative path to the directory
 * @return List of all markdown file paths under the directory
 */
export function findMarkdownFilePaths(dirPath: string): string[] {
  return walk(dirPath).filter(isMarkdownFile);
}

function walk(dirPath: string): string[] {
  const files: string[] = [];
  const directories: string[] = [];

  getDirectoryItems(dirPath).forEach(item => {
    const stat = fs.lstatSync(item);
    if (stat.isFile()) files.push(item);
    else if (stat.isDirectory()) directories.push(item);
  });

  return [...files, ...directories.map(walk).flat(1)];
}

function getDirectoryItems(dirPath: string): string[] {
  try {
    const items = fs.readdirSync(dirPath);
    return items.map(item => Path.join(dirPath, item));
  } catch {
    console.warn(`Directory not found - ${dirPath}\n`);
    return [];
  }
}

function isMarkdownFile(filePath: string): boolean {
  return filePath.toLowerCase().endsWith(".md");
}

/**
 * Parse the markdown file
 *
 * @param filePath Path to the markdown file
 * @return Parsed markdown file result
 */
export function parseMarkdownFile(filePath: string, rootDirPath: string): ParseMarkdownFileResult {
  const fileContent = fs.readFileSync(filePath);
  const parsed = matter(fileContent);

  return {
    frontMatter: parsed.data,
    bodyHtml: convertMarkdownToHtml(parsed.content, filePath, rootDirPath),
  };
}

type ParseMarkdownFileResult = {
  frontMatter: Record<string, unknown>;
  bodyHtml: string;
};

function convertMarkdownToHtml(mdContent: string, filePath: string, rootDirPath: string): string {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkChangeImageSrc, { mdFilePath: filePath, rootDirPath })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "prepend" })
    .use(rehypeStringify)
    .processSync(mdContent)
    .toString();
}

export function getIdFromFilePath(filePath: string): string {
  const pathArr = filePath.split(path.sep);
  const fileName = pathArr[pathArr.length - 1];
  const fileNameWithoutExtension = fileName.split(".")[0];
  const upperDirName = pathArr[pathArr.length - 2];

  return fileNameWithoutExtension === "index" ? upperDirName : fileNameWithoutExtension;
}
