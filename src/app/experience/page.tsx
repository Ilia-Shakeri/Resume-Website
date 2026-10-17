import { ExperienceView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "experience");

export default function Page() {
  return <ExperienceView locale="en" />;
}
