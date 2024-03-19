import { PageBuilder } from "@/components/page-builder";
import { PagePreview } from "@/components/page-preview";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";
import { PageResult } from "@/types";
import { Metadata } from "next";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await client.fetch<{
    title: string;
    seoDescription?: string;
    seoImage?: string;
  }>(
    groq`*[_type == "page" && isFrontpage][0]{
      "title": coalesce(seoTitle, title),
      seoDescription,
      "seoImage": seoImage.asset._ref
    }`,
  );
  return {
    title: seo.title,
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ""),
    ...(seo.seoDescription && { description: seo.seoDescription }),
    openGraph: {
      ...(seo.seoImage
        ? {
            images: [
              {
                url: urlForImage(seo.seoImage),
              },
            ],
          }
        : {
            images: [
              {
                url: `/api/og`,
              },
            ],
          }),
    },
  };
}

export default async function Home() {
  const initial = await loadQuery<PageResult>(HOME_QUERY);
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode) {
    return <PagePreview slug="home" query={HOME_QUERY} initial={initial} />;
  }

  return <PageBuilder content={initial.data.content} />;
}
