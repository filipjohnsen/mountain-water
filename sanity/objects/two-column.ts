import { defineField, defineType } from "sanity";

export const section = defineType({
  name: "section",
  title: "Seksjon",
  type: "object",
  fields: [
    defineField({
      name: "backgroundColor",
      title: "Bakgrunnsfarge",
      type: "string",
      options: {
        list: [
          {
            title: "Sort",
            value: "black",
          },
          {
            title: "Hvit",
            value: "white",
          },
          {
            title: "Grå",
            value: "gray",
          },
          {
            title: "Gul",
            value: "yellow",
          },
        ],
      },
    }),
    defineField({
      name: "alignment",
      title: "Justering",
      type: "string",
      options: {
        list: [
          {
            title: "Venstre",
            value: "flex-start",
          },
          {
            title: "Midten",
            value: "center",
          },
          {
            title: "Høyre",
            value: "flex-end",
          },
        ],
      },
    }),
    defineField({
      name: "columns",
      title: "Kolonner",
      type: "array",
      validation: (Rule) => Rule.required().max(2),
      of: [
        defineField({
          type: "object",
          name: "media",
          title: "Media",
          fields: [
            {
              name: "mediaType",
              title: "Media type",
              type: "string",
              options: {
                list: ["Bilde", "Video"],
              },
              initialValue: "Bilde",
            },
            {
              name: "image",
              title: "Bilde",
              type: "image",
              hidden: ({ parent }) => parent?.mediaType !== "Bilde",
            },
            {
              name: "video",
              title: "Video",
              type: "url",
              description: "YouTube video link",
              hidden: ({ parent }) => parent?.mediaType !== "Video",
            },
          ],
          preview: {
            select: {
              title: "mediaType",
              media: "image",
            },
            prepare({ media, title }) {
              return {
                title,
                media,
              };
            },
          },
        }),
        defineField({
          name: "content",
          title: "Innhold",
          type: "object",
          fields: [
            defineField({
              name: "preTitle",
              title: "Pre-title",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Tittel",
              type: "string",
            }),
            defineField({
              name: "text",
              title: "Tekst",
              type: "array",
              of: [{ type: "block" }],
            }),
            defineField({
              name: "ctas",
              title: "Linker",
              type: "array",
              of: [
                defineField({
                  name: "cta",
                  title: "Link",
                  type: "object",
                  fields: [
                    defineField({
                      name: "text",
                      title: "Text",
                      type: "string",
                    }),
                    defineField({
                      name: "link",
                      title: "Link",
                      type: "url",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Seksjon`,
      };
    },
  },
});
