import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Meal Calorie Counter",
    template: "%s | Meal Calorie Counter",
  },
  description:
    "Look up calories and macronutrients for any meal using USDA FoodData Central.",
  keywords: ["calories", "nutrition", "macros", "meal tracker", "USDA"],
  authors: [{ name: "Krishna Koushik" }],
  openGraph: {
    title: "Meal Calorie Counter",
    description: "Look up calories and macros for any meal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
