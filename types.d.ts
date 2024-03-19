import { PortableTextBlock, PortableTextComponent } from "next-sanity";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P];
};

export type PageResult = RecursivePartial<{
  content: Section[];
}>;

export type HeaderMenu = {
  cta: {
    text: string;
    link: string;
  };
  items: {
    text: string;
    link: string;
  }[];
};

export type LayoutResult = RecursivePartial<{
  title: string;
  menus: {
    headerMenu: HeaderMenu;
  };
}>;

export interface Section {
  columns: (TextColumn | ImageColumn)[];
  _type: string;
  _key: string;
  backgroundColor?: string;
  alignment?: string;
}

export type TextColumn = {
  title?: string;
  ctas?: Cta[];
  preTitle?: string;
  _type: "content";
  text?: PortableTextComponent;
  _key: string;
};

export type ImageColumn = {
  mediaType: string;
  image: Image;
  video?: string;
  _type: "media";
  _key: string;
};

export interface Image {
  asset: Asset;
  _type: string;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Cta {
  _type: string;
  link: string;
  text: string;
  _key: string;
}
