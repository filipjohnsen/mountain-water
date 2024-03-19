import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { structure } from "./sanity/lib/structure";
import { locate } from "./sanity/lib/locate";

export default defineConfig({
  basePath: "/studio",
  projectId,
  title: "Mountain Water",
  dataset,

  schema,
  plugins: [
    structureTool({
      title: "Innhold",
      structure,
    }),
    presentationTool({
      title: "Nettside bygger",
      locate,
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
      },
    }),

    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
