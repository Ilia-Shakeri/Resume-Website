import { ContactView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "contact");

export default function Page() {
  return <ContactView locale="en" />;
}
