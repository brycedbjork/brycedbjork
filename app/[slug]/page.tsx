import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { generateStaticParams, getPost } from "@/app/lib/posts";
import { mdxComponents } from "@/mdx-components";

export { generateStaticParams };

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = getPost(slug);

  return {
    title: metadata.title,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const { metadata, content } = getPost(slug);

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

export const dynamicParams = false;
