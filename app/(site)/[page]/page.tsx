import { PageBuilder } from "@/components/page-builder";
import { PagePreview } from "@/components/page-preview";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";
import { PageResult } from "@/types";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: {
    page: string;
  };
}) {
  const title = await client.fetch<string>(
    `*[_type == "page" && slug.current == $slug][0].title`,
    {
      slug: params.page,
    }
  );
  return {
    title,
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
    return <PagePreview initial={initial} />;
  }

  return <PageBuilder content={initial.data.content} />;
}
