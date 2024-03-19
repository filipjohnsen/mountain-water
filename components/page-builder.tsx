import { cn } from "@/lib/utils";
import { PageResult } from "@/types";
import Heading from "./heading";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { ButtonLink } from "./button-link";
import { PortableText } from "next-sanity";

export function PageBuilder({ content }: PageResult) {
  return (
    <div className="space-y-24">
      {content?.map((section, idx) => {
        const isSingleColumn = section?.columns?.length === 1;
        const backgroundColor = section.backgroundColor ?? "transparent";

        const isBlack = backgroundColor === "#000000";

        return (
          <div
            style={{
              backgroundColor,
            }}
            key={section._key}
          >
            <div
              className={cn(
                "container mx-auto",
                isSingleColumn
                  ? "flex"
                  : "flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:items-center",
                !!backgroundColor ? "py-16 px-8" : ""
              )}
              style={{
                justifyContent: section.alignment ?? "flex-start",
              }}
            >
              {section.columns?.map((column) => (
                <div key={column._key}>
                  {column._type === "content" && (
                    <div>
                      {column.preTitle && (
                        <p
                          className={cn(
                            "font-semibold text-[20px] leading-normal tracking-[20%] uppercase",
                            isBlack ? "text-white" : "text-black",
                            section.alignment === "center" && isSingleColumn
                              ? "text-center"
                              : "text-left"
                          )}
                        >
                          {column.preTitle}
                        </p>
                      )}
                      <Heading
                        as={idx === 0 ? "h1" : "h2"}
                        alignment={
                          section.alignment && isSingleColumn
                            ? section.alignment
                            : "left"
                        }
                        isBlack={isBlack}
                      >
                        {column.title}
                      </Heading>

                      <div
                        className={cn(
                          "prose prose-xl prose-li:marker:content-[''] prose-li:before:block prose-li:relative prose-li:before:content-[''] prose-li:before:size-8 prose-li:before:-left-10 prose-li:before:top-[0.5px] prose-li:before:absolute prose-li:before:rounded-full prose-li:before:bg-[#FFD600] prose-li:after:-left-9 prose-li:after:size-6 prose-li:after:[clip-path:polygon(28%_38%,41%_53%,75%_24%,86%_38%,40%_78%,15%_50%)] prose-li:after:bg-white prose-li:after:top-1 prose-li:after:absolute",
                          isBlack ? "text-white" : "text-black",
                          section.alignment === "center" && isSingleColumn
                            ? "text-center"
                            : "text-left"
                        )}
                      >
                        <PortableText value={column.text} />
                      </div>
                      <div
                        className={cn(
                          "flex gap-4 items-center mt-8 flex-wrap",
                          section.alignment === "center"
                            ? "justify-center"
                            : "justify-start"
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
                    <div className="aspect-video shrink-0 w-full relative rounded-lg overflow-hidden">
                      <Image
                        src={urlForImage(column.image?.asset?._ref ?? "")}
                        alt=""
                        fill
                      />
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
