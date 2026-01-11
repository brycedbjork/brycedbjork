import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

interface PostMetadata {
  title: string;
  slug: string;
}

function getPosts(): PostMetadata[] {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return data as PostMetadata;
  });
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white px-6 py-16 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 flex items-center gap-6">
          <Image
            alt="Bryce Bjork"
            className="rounded-full"
            height={96}
            src="/bryce.jpg"
            width={96}
          />
          <h1 className="font-bold text-4xl text-black leading-tight tracking-tight md:text-5xl dark:text-white">
            Bryce Bjork
          </h1>
        </div>

        <div className="mb-16 space-y-4 border-zinc-200 border-b pb-12 text-lg text-zinc-700 leading-relaxed dark:border-zinc-800 dark:text-zinc-300">
          <p>
            I'm an{" "}
            <Link href="https://www.forbes.com/profile/lenny-learning/">
              entrepreneur
            </Link>
            , <Link href="https://github.com/brycebjork">developer</Link>, and
            designer. My mission is to advance human development with AI.
            Currently the Co-Founder and CTO of{" "}
            <Link href="https://www.lenny.com">Lenny</Link>.
          </p>
        </div>

        <div>
          <h2 className="mb-6 font-semibold text-2xl text-black tracking-tight dark:text-white">
            Writing
          </h2>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  className="text-lg text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-black hover:decoration-zinc-500 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-white dark:hover:decoration-zinc-400"
                  href={`/${post.slug}`}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
