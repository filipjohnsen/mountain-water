import { PageBuilder } from "@/components/page-builder";
import { PagePreview } from "@/components/page-preview";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";
import { PageResult } from "@/types";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: {
    page: string;
  };
}): Promise<Metadata> {
  const seo = await client.fetch<{
    title: string;
    seoDescription?: string;
    seoImage?: string;
  }>(
    `*[_type == "page" && slug.current == $slug][0]{
      "title": coalesce(seoTitle, title),
      seoDescription,
      "seoImage": seoImage.asset._ref
    }`,
    {
      slug: params.page,
    },
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
                url: `/api/og/${params.page}`,
              },
            ],
          }),
    },
  };
}

export default async function Page({
  params,
}: {
  params: {
    page: string;
  };
}) {
  const initial = await loadQuery<PageResult>(PAGE_QUERY, {
    slug: params.page,
  });

  if (!initial.data) {
    notFound();
  }

  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode) {
    return (
      <PagePreview slug={params.page} query={PAGE_QUERY} initial={initial} />
    );
  }

  return <PageBuilder content={initial.data.content} />;
}
