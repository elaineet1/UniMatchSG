import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-5xl gap-4 p-4 text-sm">
            <Link href="/">Home</Link>
            <Link href="/results-input">Results Input</Link>
            <Link href="/quiz">Quiz</Link>
            <Link href="/recommendations">Recommendations</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}
