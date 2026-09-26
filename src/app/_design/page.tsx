import type { Metadata } from "next";
import { SpecSheet } from "./SpecSheet";

/**
 * Reference artifact only. Next treats underscore folders as private, so this
 * file is not routed; it is kept for the art-direction record and still
 * type-checks against the live tokens.
 */
export const metadata: Metadata = {
  title: "Foundation spec sheet",
  robots: { index: false, follow: false },
};

export default function DesignPage() {
  return <SpecSheet />;
}
