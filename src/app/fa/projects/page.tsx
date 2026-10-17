import { ProjectsView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("fa", "projects");

export default function Page() {
  return <ProjectsView locale="fa" />;
}
