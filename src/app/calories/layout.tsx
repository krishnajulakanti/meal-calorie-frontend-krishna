import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Search",
  description:
    "Search for any dish and get detailed calorie and macro information.",
};

export default function CalorieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
