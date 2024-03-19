import { sanitiseForPreview } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import { PageResult } from "@/types";
import getVideoId from "get-video-id";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { ButtonLink } from "./button-link";
import Heading from "./heading";
import { YouTubePlayer } from "./youtube-video";

export function PageBuilder({ content }: PageResult) {
  return (
    <div>
      {content?.map((section, idx) => {
        const isSingleColumn = section?.columns?.length === 1;

        const isMediaLeft = section.columns?.[0]._type === "media";

        return (
          <div
            className="group data-[bg='black']:bg-black data-[bg='gray']:bg-[#E9E9E9] data-[bg='white']:bg-white data-[bg='yellow']:bg-[#FFD600]"
            key={section._key}
            data-bg={sanitiseForPreview(section.backgroundColor ?? "")}
            data-alignment={sanitiseForPreview(section.alignment ?? "")}
            data-single-column={isSingleColumn}
            data-media-first={isMediaLeft}
            data-stacking={sanitiseForPreview(section.stacking ?? "")}
            data-cta={
              !!section.columns?.find(
                (column) => column._type === "content" && column.ctas?.length,
              )
            }
          >
            <div className="container mx-auto flex flex-col-reverse justify-start gap-10 px-8 py-16 group-data-[stacking='vertical']:grid group-data-[media-first='true']:flex-col group-data-[alignment='end']:justify-end group-data-[alignment='center']:justify-center group-data-[bg='black']:text-white md:grid md:group-data-[stacking='default']:grid-cols-2 md:group-data-[stacking='default']:items-center">
              {section.columns?.map((column) => (
                <div className="w-full" key={column._key}>
                  {column._type === "content" && (
                    <div>
                      {column.preTitle && (
                        <p className="text-left text-[20px] font-semibold uppercase leading-normal tracking-wider group-data-[alignment='center']:text-center">
                          {column.preTitle}
                        </p>
                      )}
                      <Heading as={idx === 0 ? "h1" : "h2"}>
                        {column.title}
                      </Heading>

                      <div className="prose prose-xl text-left text-black group-data-[alignment='center']:mx-auto group-data-[alignment='left']:text-left group-data-[alignment='center']:text-center group-data-[alignment='right']:text-right group-data-[bg='black']:text-white prose-li:relative prose-li:marker:content-[''] prose-li:before:absolute prose-li:before:-left-10 prose-li:before:top-[0.5px] prose-li:before:block prose-li:before:size-8 prose-li:before:rounded-full prose-li:before:bg-[#FFD600] prose-li:before:content-[''] prose-li:after:absolute prose-li:after:-left-9 prose-li:after:top-1 prose-li:after:size-6 prose-li:after:bg-white prose-li:after:[clip-path:polygon(28%_38%,41%_53%,75%_24%,86%_38%,40%_78%,15%_50%)] group-data-[bg='yellow']:prose-li:before:bg-white group-data-[bg='yellow']:prose-li:after:bg-[#FFD600]">
                        <PortableText value={column.text} />
                      </div>
                      {column.ctas && (
                        <div className="mt-8 flex flex-wrap items-center justify-start gap-4 group-data-[alignment='center']:justify-center">
                          {column.ctas.map((cta, idx) => (
                            <ButtonLink
                              href={cta?.link ?? ""}
                              text={cta?.text ?? ""}
                              key={cta?._key}
                              variant={idx > 0 ? "secondary" : "primary"}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {column._type === "media" && (
                    <div className="relative mr-auto aspect-video w-full shrink-0 basis-full overflow-hidden rounded-lg group-data-[alignment='center']:mx-auto group-data-[alignment='right']:ml-auto group-data-[cta='true']:group-data-[stacking='vertical']:mt-8 group-data-[single-column='true']:max-w-[800px]">
                      {sanitiseForPreview(column.mediaType ?? "") ===
                        "Video" && (
                        <YouTubePlayer
                          id={getVideoId(column.video ?? "").id ?? ""}
                          title=""
                        />
                      )}
                      {sanitiseForPreview(column.mediaType ?? "") ===
                        "Bilde" && (
                        <Image
                          src={urlForImage(column.image?.asset?._ref ?? "")}
                          alt=""
                          fill
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
