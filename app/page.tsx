import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "./lib/posts";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function Home() {
  const posts = getAllPosts();

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
            , <Link href="https://github.com/brycedbjork">developer</Link>, and
            designer. I've actively coded since I was 10, started my first
            company at 15, and studied Economics at Yale. My mission is to
            advance human development with AI. Currently, I'm currently the
            Co-Founder and CTO of{" "}
            <Link href="https://www.lenny.com">Lenny</Link>.
          </p>
        </div>

        <div>
          <h2 className="mb-6 font-semibold text-2xl text-black tracking-tight dark:text-white">
            Writing
          </h2>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li
                className="flex items-center justify-between gap-4"
                key={post.slug}
              >
                <Link
                  className="text-lg text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-black hover:decoration-zinc-500 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-white dark:hover:decoration-zinc-400"
                  href={`/${post.slug}`}
                >
                  {post.title}
                </Link>
                <span className="shrink-0 text-sm text-zinc-400 dark:text-zinc-500">
                  {formatDate(post.published)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
