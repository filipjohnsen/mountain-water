import { defineArrayMember, defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Sider",
  type: "document",
  groups: [
    {
      name: "content",
      title: "Innhold",
      default: true,
    },
    {
      name: "seo",
      title: "Søkemotoroptimalisering",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Side tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Tittelen til siden",
      group: "content",
    }),
    defineField({
      name: "isFrontpage",
      title: "Forside",
      type: "boolean",
      description: "Om siden skal være forsiden",
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      description: "URL til siden",
      hidden: ({ parent }) => !parent?.title || parent?.isFrontpage,
      group: "content",
    }),
    defineField({
      name: "content",
      title: "Sidebygger",
      type: "array",
      of: [defineArrayMember({ type: "section" })],
      hidden: ({ parent }) => !parent?.title,
      group: "content",
    }),
    defineField({
      name: "seoImage",
      title: "Bilde",
      type: "image",
      description:
        "Bilde som brukes av søkemotorer når siden deles på sosiale medier.",
      group: "seo",
    }),
    defineField({
      name: "seoTitle",
      title: "Tittel",
      type: "string",
      description: "Tittelen til siden, brukes av søkemotorer.",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Beskrivelse",
      type: "text",
      description: "En kort beskrivelse av siden, brukes av søkemotorer.",
      group: "seo",
    }),
  ],
});
