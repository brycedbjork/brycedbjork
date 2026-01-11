import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface PostMetadata {
  title: string;
  slug: string;
  published: string;
  updated?: string;
}

export function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return { metadata: { ...data, slug } as PostMetadata, content };
}

export function getAllPosts(): PostMetadata[] {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(".mdx", "");
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return { ...data, slug } as PostMetadata;
  });
}

export function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}
