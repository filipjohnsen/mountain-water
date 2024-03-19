import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Side innstillinger",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      description: "Domenenavnet til siden",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      description:
        "En kort beskrivelse av siden, brukes som 'fallback' i søkemoterer dersom siden ikke har sin egen beskrivelse.",
    }),
    defineField({
      name: "menus",
      title: "Menyer",
      type: "object",
      fields: [
        defineField({
          name: "headerMenu",
          title: "Topp meny",
          type: "object",
          fields: [
            {
              name: "cta",
              title: "Konvertingsknapp",
              type: "object",
              fields: [
                defineField({
                  name: "text",
                  title: "Tekst",
                  type: "string",
                }),
                defineField({
                  name: "link",
                  title: "Link",
                  type: "reference",
                  to: [{ type: "page" }],
                }),
              ],
            },
            {
              name: "items",
              title: "Meny elementer",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "menuItem",
                  title: "Menu element",
                  fields: [
                    defineField({
                      name: "text",
                      title: "Tekst",
                      type: "string",
                    }),
                    defineField({
                      name: "link",
                      title: "Link",
                      type: "reference",
                      to: [{ type: "page" }],
                    }),
                  ],
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
});
