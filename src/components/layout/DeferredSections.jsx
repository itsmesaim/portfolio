"use client";

import dynamic from "next/dynamic";

const JourneySection = dynamic(
  () =>
    import("@/components/sections/Journey/JourneySection").then(
      (m) => m.JourneySection,
    ),
  { ssr: false },
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/Contact/ContactSection").then(
      (m) => m.ContactSection,
    ),
  { ssr: false },
);

export function DeferredSections() {
  return (
    <>
      <JourneySection />
      <ContactSection />
    </>
  );
}
