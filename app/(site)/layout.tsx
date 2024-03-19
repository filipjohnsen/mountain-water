import { Inter } from "next/font/google";
import "../globals.css";
import { draftMode } from "next/headers";
import LiveVisualEditing from "@/components/live-visual-editing";
import { Header } from "@/components/header";
import { loadQuery } from "@sanity/react-loader";
import { LAYOUT_QUERY } from "@/sanity/lib/queries";
import { LayoutResult } from "@/types";

const font = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initial = await loadQuery<LayoutResult>(LAYOUT_QUERY);

  return (
    <html lang="en">
      <body className={font.className}>
        <Header
          menu={initial.data.menus?.headerMenu ?? {}}
          title={initial.data.title ?? ""}
        />
        {children}
        {draftMode().isEnabled && <LiveVisualEditing />}
      </body>
    </html>
  );
}
