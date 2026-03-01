import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Calculate your UAS and explore courses (NUS, NTU, SMU)</h1>
      <p className="text-sm text-slate-700">MVP for AY2026-style guidance. This tool provides estimates only. Always verify official university sources.</p>
      <Link href="/results-input" className="rounded bg-blue-600 px-4 py-2 text-white">Start</Link>
    </section>
  );
}
