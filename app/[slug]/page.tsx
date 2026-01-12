import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getPost } from "@/app/lib/posts";
import { mdxComponents } from "@/mdx-components";

export { generateStaticParams } from "@/app/lib/posts";

// Regex patterns for stripping markdown (defined at top level for performance)
const FRONTMATTER_REGEX = /^---[\s\S]*?---/m;
const CODE_BLOCK_REGEX = /```[\s\S]*?```/g;
const INLINE_CODE_REGEX = /`[^`]+`/g;
const IMAGE_REGEX = /!\[.*?\]\(.*?\)/g;
const LINK_REGEX = /\[([^\]]+)\]\([^)]+\)/g;
const HEADING_REGEX = /#{1,6}\s+/g;
const EMPHASIS_REGEX = /[*_~]+([^*_~]+)[*_~]+/g;
const BLOCKQUOTE_REGEX = />\s+/g;
const LIST_MARKER_REGEX = /-\s+/g;
const NEWLINE_REGEX = /\n+/g;
const WHITESPACE_REGEX = /\s+/g;

function getExcerpt(content: string, maxLength = 160): string {
  // Strip MDX/Markdown syntax to get plain text
  const plainText = content
    .replace(FRONTMATTER_REGEX, "")
    .replace(CODE_BLOCK_REGEX, "")
    .replace(INLINE_CODE_REGEX, "")
    .replace(IMAGE_REGEX, "")
    .replace(LINK_REGEX, "$1")
    .replace(HEADING_REGEX, "")
    .replace(EMPHASIS_REGEX, "$1")
    .replace(BLOCKQUOTE_REGEX, "")
    .replace(LIST_MARKER_REGEX, "")
    .replace(NEWLINE_REGEX, " ")
    .replace(WHITESPACE_REGEX, " ")
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength).trim()}...`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { metadata, content } = post;
  const description = getExcerpt(content);

  return {
    title: metadata.title,
    description,
    openGraph: {
      title: metadata.title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { metadata, content } = post;

  return (
    <main className="min-h-screen bg-white px-6 py-16 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        {/* Hero Title */}
        <header className="mb-16 border-zinc-200 border-b pb-12 dark:border-zinc-800">
          <h1 className="mb-4 font-bold text-4xl text-black leading-tight tracking-tight md:text-5xl dark:text-white">
            {metadata.title}
          </h1>
          <div className="flex items-center gap-3">
            <Link
              className="flex items-center gap-3 text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              href="/"
            >
              <Image
                alt="Bryce Bjork"
                className="rounded-full"
                height={32}
                src="/bryce.jpg"
                width={32}
              />
              <span className="text-lg">Bryce Bjork</span>
            </Link>
            <span className="text-zinc-500 dark:text-zinc-500">
              {formatDate(metadata.published)}
              {metadata.updated && ` (updated ${formatDate(metadata.updated)})`}
            </span>
          </div>
        </header>

        <article className="prose-article">
          <MDXRemote
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        light: "github-light",
                        dark: "github-dark",
                      },
                    },
                  ],
                ],
              },
            }}
            source={content}
          />
        </article>
      </div>
    </main>
  );
}
