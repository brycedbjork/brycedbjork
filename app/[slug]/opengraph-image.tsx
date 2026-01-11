import { ImageResponse } from "next/og";
import { getPost } from "@/app/lib/posts";

export { generateStaticParams } from "@/app/lib/posts";

// Regex at top level for performance
const FONT_URL_REGEX =
  /src: url\(([^)]+)\) format\(['"](?:truetype|woff2)['"]\)/;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = getPost(slug);

  // Load STIX Two Text font - fetch CSS first to get the actual font URL
  const fontCss = await fetch(
    "https://fonts.googleapis.com/css2?family=STIX+Two+Text:wght@700&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((res) => res.text());

  // Extract the font URL from the CSS (ttf or woff2)
  const fontUrlMatch = fontCss.match(FONT_URL_REGEX);
  const fontUrl = fontUrlMatch?.[1];

  const stixFont = fontUrl
    ? await fetch(fontUrl).then((res) => res.arrayBuffer())
    : null;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        padding: "60px 80px",
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontFamily: "STIX Two Text",
            fontWeight: 700,
            color: "#000000",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "100%",
          }}
        >
          {metadata.title}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: stixFont
        ? [
            {
              name: "STIX Two Text",
              data: stixFont,
              style: "normal" as const,
              weight: 700 as const,
            },
          ]
        : [],
    }
  );
}
