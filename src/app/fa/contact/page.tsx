import { ContactView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("fa", "contact");

export default function Page() {
  return <ContactView locale="fa" />;
}
