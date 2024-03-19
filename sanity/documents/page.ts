import { defineArrayMember, defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Sider",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Side tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Tittelen til siden",
    }),
    defineField({
      name: "isFrontpage",
      title: "Forside",
      type: "boolean",
      description: "Om siden skal være forsiden",
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
    }),
    defineField({
      name: "content",
      title: "Sidebygger",
      type: "array",
      of: [defineArrayMember({ type: "section" })],
      hidden: ({ parent }) => !parent?.title,
    }),
  ],
});
