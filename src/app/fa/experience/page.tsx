import { ExperienceView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("fa", "experience");

export default function Page() {
  return <ExperienceView locale="fa" />;
}
