import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your meal search history and nutrition stats.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
