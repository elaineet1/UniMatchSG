"use client";
import { useState } from "react";
import { UNI_STYLE_Q } from "@/lib/quiz/questions";
import { deriveUniStyleProfile } from "@/lib/quiz/scoring";
import { useAppStore } from "@/state/useAppStore";
import Link from "next/link";

export default function UniStyleQuizPage() {
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const setUniStyle = useAppStore(s=>s.setUniStyle);
  const ready = UNI_STYLE_Q.every(q=>answers[q.id]);
  const profile = deriveUniStyleProfile(answers);
  return <div className="space-y-4">
    <h1 className="text-xl font-bold">University Style Fit (preference-only)</h1>
    <p className="text-sm">This does not affect eligibility; it only helps within-tier sorting.</p>
    {UNI_STYLE_Q.map(q=><div key={q.id}><h3 className="font-medium">{q.text}</h3>{q.options.map(o=><label key={o.key} className="block"><input type="radio" name={q.id} checked={answers[q.id]===o.key} onChange={()=>setAnswers({...answers,[q.id]:o.key})}/> {o.key}. {o.text}</label>)}</div>)}
    <button disabled={!ready} className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-slate-300" onClick={()=>setUniStyle(profile)}>Save style profile</button>
    <Link href="/recommendations" className="block text-blue-700 underline">Go to Recommendations</Link>
  </div>;
}
