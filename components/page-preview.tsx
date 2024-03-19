"use client";

import { HOME_QUERY } from "@/sanity/lib/queries";
import { PageResult } from "@/types";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { PageBuilder } from "./page-builder";

export function PagePreview({
  initial,
  query,
  slug,
}: {
  initial: QueryResponseInitial<PageResult>;
  query: string;
  slug: string;
}) {
  const { data } = useQuery(
    query,
    {
      slug,
    },
    {
      initial,
    }
  );

  if (!data) return null;

  return <PageBuilder content={data.content} />;
}
