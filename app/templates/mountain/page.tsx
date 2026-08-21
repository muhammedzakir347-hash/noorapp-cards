import type { Metadata } from "next";
import { MountainFrame } from "./MountainFrame";

export const metadata: Metadata = {
  title: "Mountain Wedding Invitation Template",
  description: "Preview the Mountain Indian wedding invitation template.",
};

export default function MountainTemplatePage() {
  return (
    <main className="min-h-screen bg-black">
      <MountainFrame />
    </main>
  );
}
