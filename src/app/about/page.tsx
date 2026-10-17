import { AboutView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "about");

export default function Page() {
  return <AboutView locale="en" />;
}
