import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { generateStaticParams, getPost } from "@/app/lib/posts";

export { generateStaticParams };

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

  // Load STIX Two Text font
  const stixFont = await fetch(
    "https://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkn9jFJ3577w.woff"
  ).then((res) => res.arrayBuffer());

  // Read profile image as base64
  const imageData = readFileSync(join(process.cwd(), "public", "bryce.jpg"));
  const base64Image = `data:image/jpeg;base64,${imageData.toString("base64")}`;

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
            fontSize: 64,
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

      {/* Author section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <img
          alt="Bryce Bjork"
          height={64}
          src={base64Image}
          style={{
            borderRadius: "50%",
          }}
          width={64}
        />
        <span
          style={{
            fontSize: 28,
            fontFamily: "STIX Two Text",
            color: "#52525b",
          }}
        >
          Bryce Bjork
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "STIX Two Text",
          data: stixFont,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
