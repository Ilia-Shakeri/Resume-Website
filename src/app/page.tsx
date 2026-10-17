import { HomeView } from "@/components/views";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <HomeView locale="en" />;
}
