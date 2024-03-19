import { groq } from "next-sanity";

export const HOME_QUERY = groq`*[_type == "page" && isFrontpage == true][0]{content}`;
export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{content}`;
export const LAYOUT_QUERY = groq`*[_type == "siteSettings"][0]{
    title, 
    menus{
      headerMenu {
        defined(cta.link._ref) => {
          cta {
            text,
            "link": link->slug.current
          }
        },
        items[]{
          text,
          "link": link->slug.current
        }
      }
    }
}`;
