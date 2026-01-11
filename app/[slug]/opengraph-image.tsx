import { ImageResponse } from "next/og";
import { getPost } from "@/app/lib/posts";

export { generateStaticParams } from "@/app/lib/posts";

// Regex at top level for performance
const FONT_URL_REGEX =
  /src: url\(([^)]+)\) format\(['"](?:truetype|woff2)['"]\)/;
const FRONTMATTER_REGEX = /---[\s\S]*?---/;
const FOOTNOTE_REGEX = /\[\^[^\]]+\](?::[^\n]+)?/g;
const BOLD_REGEX = /\*\*/g;
const SENTENCE_SPLIT_REGEX = /(?<=[.!?])\s+/;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Extract a teaser from the content - ~5 lines worth
function extractTeaser(content: string): string {
  // Remove frontmatter and footnotes
  const cleaned = content
    .replace(FRONTMATTER_REGEX, "")
    .replace(FOOTNOTE_REGEX, "")
    .replace(BOLD_REGEX, "")
    .trim();

  // Get first few sentences (~450 chars for 5 lines)
  const sentences = cleaned.split(SENTENCE_SPLIT_REGEX);
  let teaser = "";
  for (const sentence of sentences) {
    if (teaser.length + sentence.length > 450) break;
    teaser += (teaser ? " " : "") + sentence.trim();
  }

  // Truncate if still too long, always add ellipsis
  if (teaser.length > 450) {
    return `${teaser.slice(0, 447)}...`;
  }
  return `${teaser}...`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata, content } = getPost(slug);
  const teaser = extractTeaser(content);

  // Load STIX Two Text fonts - fetch CSS first to get the actual font URLs
  const [stixRegularCss, stixBoldCss] = await Promise.all([
    fetch(
      "https://fonts.googleapis.com/css2?family=STIX+Two+Text:wght@400&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((res) => res.text()),
    fetch(
      "https://fonts.googleapis.com/css2?family=STIX+Two+Text:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((res) => res.text()),
  ]);

  // Extract the font URLs from the CSS
  const regularUrlMatch = stixRegularCss.match(FONT_URL_REGEX);
  const boldUrlMatch = stixBoldCss.match(FONT_URL_REGEX);

  const [stixRegular, stixBold] = await Promise.all([
    regularUrlMatch?.[1]
      ? fetch(regularUrlMatch[1]).then((res) => res.arrayBuffer())
      : null,
    boldUrlMatch?.[1]
      ? fetch(boldUrlMatch[1]).then((res) => res.arrayBuffer())
      : null,
  ]);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#fafafa", // zinc-50
        padding: "70px 80px",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 88,
          fontFamily: "STIX Two Text",
          fontWeight: 700,
          color: "#18181b", // zinc-900
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "32px",
        }}
      >
        {metadata.title}
      </div>

      {/* Article teaser */}
      <div
        style={{
          fontSize: 32,
          fontFamily: "STIX Two Text",
          fontWeight: 400,
          color: "#52525b", // zinc-600
          lineHeight: 1.6,
        }}
      >
        {teaser}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        ...(stixRegular
          ? [
              {
                name: "STIX Two Text",
                data: stixRegular,
                style: "normal" as const,
                weight: 400 as const,
              },
            ]
          : []),
        ...(stixBold
          ? [
              {
                name: "STIX Two Text",
                data: stixBold,
                style: "normal" as const,
                weight: 700 as const,
              },
            ]
          : []),
      ],
    }
  );
}
