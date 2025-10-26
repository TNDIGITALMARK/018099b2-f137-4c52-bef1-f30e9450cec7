import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { ZyloProvider } from "@/lib/zylo/provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midnight Dashboard",
  description: "Modern dark web app with stunning 3D animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

      
        {/* PHOENIX_EDITOR_INJECTION_START */}
        {(process.env.NODE_ENV === 'development' ||
          process.env.NEXT_PUBLIC_ENABLE_PHOENIX_EDITOR === 'true') && (
          <>
            <link rel="stylesheet" href="/phoenix-editor/helper.css?v=1761505097768" />
            <script
              src="/phoenix-editor/sourceMapTracker.js?v=1761505097768"
              data-phoenix-sourcemap="true"
              defer
            />
            <script
              src="/phoenix-editor/helper.js?v=1761505097768"
              data-phoenix-enabled="true"
              defer
            />
            <script
              src="/phoenix-editor/visualEditExtension.js?v=1761505097768"
              data-phoenix-visual-edit="true"
              defer
            />
            <script
              src="/phoenix-editor/contextIntegration.js?v=1761505097768"
              data-phoenix-context="true"
              defer
            />
            <script
              src="/phoenix-editor/inlineTextEditor.js?v=1761505097768"
              data-phoenix-text-edit="true"
              defer
            />
          </>
        )}
        {/* PHOENIX_EDITOR_INJECTION_END */}
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <QueryProvider>
          <ZyloProvider>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                disableTransitionOnChange
              >
                <TooltipProvider>
                  {children}
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </ThemeProvider>
            </AuthProvider>
          </ZyloProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
