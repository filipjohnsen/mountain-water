import { cn, sanitiseForPreview } from "@/lib/utils";
import { PageResult } from "@/types";
import Heading from "./heading";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { ButtonLink } from "./button-link";
import { PortableText } from "next-sanity";
import { YouTubePlayer } from "./youtube-video";
import getVideoId from "get-video-id";
import { Fragment } from "react";

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
          >
            <div
              className={cn(
                "container mx-auto justify-start px-8 py-16 group-data-[media-first='true']:flex-col group-data-[alignment='end']:justify-end group-data-[alignment='center']:justify-center group-data-[bg='black']:text-white",
                isSingleColumn
                  ? "flex"
                  : `flex ${
                      isMediaLeft ? "flex-col" : "flex-col-reverse"
                    } gap-10 md:grid md:grid-cols-2 md:items-center`,
              )}
            >
              {section.columns?.map((column) => (
                <div className="w-full" key={column._key}>
                  {column._type === "content" && (
                    <div>
                      {column.preTitle && (
                        <p
                          className={cn(
                            "text-left text-[20px] font-semibold uppercase leading-normal tracking-wider group-data-[single-column='true']:group-data-[alignment='center']:text-center",
                          )}
                        >
                          {column.preTitle}
                        </p>
                      )}
                      <Heading as={idx === 0 ? "h1" : "h2"}>
                        {column.title}
                      </Heading>

                      <div
                        className={cn(
                          "prose prose-xl text-left text-black group-data-[alignment='center']:mx-auto group-data-[alignment='left']:text-left group-data-[alignment='center']:text-center group-data-[alignment='right']:text-right group-data-[bg='black']:text-white prose-li:relative prose-li:marker:content-[''] prose-li:before:absolute prose-li:before:-left-10 prose-li:before:top-[0.5px] prose-li:before:block prose-li:before:size-8 prose-li:before:rounded-full prose-li:before:bg-[#FFD600] prose-li:before:content-[''] prose-li:after:absolute prose-li:after:-left-9 prose-li:after:top-1 prose-li:after:size-6 prose-li:after:bg-white prose-li:after:[clip-path:polygon(28%_38%,41%_53%,75%_24%,86%_38%,40%_78%,15%_50%)]",
                        )}
                      >
                        <PortableText value={column.text} />
                      </div>
                      <div
                        className={cn(
                          "mt-8 flex flex-wrap items-center justify-start gap-4 group-data-[alignment='center']:justify-center",
                        )}
                      >
                        {column.ctas?.map((cta, idx) => (
                          <ButtonLink
                            href={cta?.link ?? ""}
                            text={cta?.text ?? ""}
                            key={cta?._key}
                            variant={idx > 0 ? "secondary" : "primary"}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {column._type === "media" && (
                    <div
                      className={cn(
                        "relative mr-auto aspect-video w-full shrink-0 basis-full overflow-hidden rounded-lg group-data-[alignment='center']:mx-auto group-data-[alignment='right']:ml-auto",
                        isSingleColumn ? "max-w-[800px]" : "",
                      )}
                    >
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
