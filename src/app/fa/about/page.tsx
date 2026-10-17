import { AboutView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("fa", "about");

export default function Page() {
  return <AboutView locale="fa" />;
}
