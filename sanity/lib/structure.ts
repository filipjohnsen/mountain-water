import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) => {
  return S.list()
    .title("Mountain Water")
    .items([
      S.listItem()
        .title("Sider")
        .child(S.documentTypeList("page").title("Sider")),
      S.listItem()
        .title("Innstillinger")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);
};
