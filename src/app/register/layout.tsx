import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new Meal Calorie Counter account.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
