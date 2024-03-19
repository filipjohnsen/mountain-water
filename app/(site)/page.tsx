import { PageBuilder } from "@/components/page-builder";
import { PagePreview } from "@/components/page-preview";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";
import { PageResult } from "@/types";
import { draftMode } from "next/headers";

export async function generateMetadata() {
  const title = await client.fetch<string>(
    `*[_type == "page" && isFrontpage == true][0].title`
  );
  return {
    title,
  };
}

export default async function Home() {
  const initial = await loadQuery<PageResult>(HOME_QUERY);
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode) {
    return <PagePreview initial={initial} />;
  }

  return <PageBuilder content={initial.data.content} />;
}
