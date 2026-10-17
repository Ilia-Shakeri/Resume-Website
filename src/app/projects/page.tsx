import { ProjectsView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "projects");

export default function Page() {
  return <ProjectsView locale="en" />;
}
