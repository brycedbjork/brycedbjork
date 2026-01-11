import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";

const BASE_URL = "https://brycedbjork.com";

interface PostMetadata {
  slug: string;
  published: string;
  updated?: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return data as PostMetadata;
  });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: new Date(post.updated ?? post.published),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postEntries,
  ];
}
