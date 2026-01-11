import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents: MDXComponents = {
  // Headings with refined typography
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mt-12 mb-4 font-bold text-3xl text-black tracking-tight dark:text-white"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 mb-4 font-semibold text-2xl text-black tracking-tight dark:text-white"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 mb-3 font-semibold text-black text-xl tracking-tight dark:text-white"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="mt-8 mb-3 font-semibold text-black text-lg tracking-tight dark:text-white"
      {...props}
    />
  ),

  // Paragraphs with comfortable reading
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="my-5 text-lg text-zinc-700 leading-relaxed dark:text-zinc-300"
      {...props}
    />
  ),

  // Links with elegant underline
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-black underline decoration-zinc-300 underline-offset-2 transition-colors hover:decoration-zinc-600 dark:text-white dark:decoration-zinc-700 dark:hover:decoration-zinc-300"
      {...props}
    />
  ),

  // Unordered lists
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-5 ml-1 space-y-2 text-lg text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),

  // Ordered lists
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-5 ml-1 list-inside list-decimal space-y-2 text-lg text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),

  // List items with custom bullet
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li
      className="pl-2 leading-relaxed marker:text-zinc-400 dark:marker:text-zinc-500"
      {...props}
    />
  ),

  // Blockquote with left border accent
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-8 border-zinc-300 border-l-2 pl-6 text-zinc-600 italic dark:border-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),

  // Inline code
  code: (props: ComponentPropsWithoutRef<"code">) => {
    // Check if this is inside a pre tag (code block) by checking parent
    const isInline = !props.className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
          {...props}
        />
      );
    }
    return <code className="font-mono text-sm" {...props} />;
  },

  // Code blocks
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg p-5 text-sm leading-relaxed shadow-sm [&>code]:bg-transparent"
      {...props}
    />
  ),

  // Strong/bold text
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-black dark:text-white" {...props} />
  ),

  // Emphasized/italic text
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic" {...props} />
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-12 border-zinc-200 border-t dark:border-zinc-800" />
  ),

  // Images
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <Image
      alt={props.alt || ""}
      className="my-8 h-auto w-full rounded-lg shadow-sm"
      height={600}
      sizes="100vw"
      src={(props.src as string) || ""}
      style={{ width: "100%", height: "auto" }}
      width={800}
    />
  ),
};
