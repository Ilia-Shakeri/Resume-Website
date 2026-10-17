import { HomePage } from "@/components/HomePage";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata("fa");

export default function Page() {
  return <HomePage locale="fa" />;
}
