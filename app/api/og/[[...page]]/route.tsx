import { client } from "@/sanity/lib/client";
import { ImageResponse } from "next/og";

export const runtime = "edge";

type PageData = {
  title: string;
  url: string;
};

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      page?: string[];
    };
  },
) {
  const slug = params?.page?.join("/");

  const url = new URL(request.url);

  const projection = `{
    title,
    "url": "${url.origin}",
    defined(slug.current) => {
      "url": "${url.origin}/" + slug.current
    }
  }`;
  const query = slug
    ? `*[_type == 'page' && slug.current == $slug][0]${projection}`
    : `*[_type == 'page' && isFrontpage][0]${projection}`;

  const pageData = slug
    ? await client.fetch<PageData>(query, {
        slug,
      })
    : await client.fetch<PageData>(query);

  if (!pageData) {
    return new Response("Not found", {
      status: 404,
    });
  }

  const imageData = await fetch(
    new URL("@/public/opengraph-image.jpg", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "2rem",
        }}
      >
        <img
          style={{
            position: "absolute",
            inset: 0,
            filter: "brightness(0.3)",
          }}
          width={1200}
          height={630}
          // @ts-ignore
          src={imageData}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: "white", fontSize: "3rem" }}>
            {pageData.title}
          </span>
          <span style={{ color: "white", fontSize: "1rem" }}>
            {pageData.url}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
