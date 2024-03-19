"use client";

import { HOME_QUERY } from "@/sanity/lib/queries";
import { PageResult } from "@/types";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { PageBuilder } from "./page-builder";

export function PagePreview({
  initial,
}: {
  initial: QueryResponseInitial<PageResult>;
}) {
  const { data } = useQuery(
    HOME_QUERY,
    {},
    {
      initial,
    }
  );

  if (!data) return null;

  return <PageBuilder content={data.content} />;
}
