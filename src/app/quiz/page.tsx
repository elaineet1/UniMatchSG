"use client";
import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quiz/questions";
import { scoreQuiz } from "@/lib/quiz/scoring";
import { TAG_LABELS, TAGS } from "@/lib/constants/tags";
import { useAppStore } from "@/state/useAppStore";
import Link from "next/link";

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [i, setI] = useState(0);
  const [manualTags, setManualTags] = useState<string[]>([]);
  const setQuiz = useAppStore(s=>s.setQuiz);

  const q = QUIZ_QUESTIONS[i];
  const done = i >= QUIZ_QUESTIONS.length;
  const profile = scoreQuiz(answers);

  if (done) {
    const top = Array.from(new Set([...profile.topTags, ...manualTags])).slice(0,6);
    return <div className="space-y-4">
      <h1 className="text-xl font-bold">Quiz Results</h1>
      <p>Top tags: {top.map(t=>TAG_LABELS[t as keyof typeof TAG_LABELS]).join(", ")}</p>
      <p>Suggested interest areas are generated from your responses. You can override below.</p>
      <div className="grid grid-cols-2 gap-2">{TAGS.map(t=><label key={t}><input type="checkbox" checked={manualTags.includes(t)} onChange={e=>setManualTags(v=>e.target.checked?[...v,t]:v.filter(x=>x!==t))}/> {TAG_LABELS[t]}</label>)}</div>
      <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={()=>setQuiz({quizTagPoints:profile.tagPoints,topTags:top as any,flags:profile.flags})}>Save Quiz Profile</button>
      <Link href="/uni-style-quiz" className="block text-blue-700 underline">Continue to University Style Quiz</Link>
    </div>;
  }

  return <div className="space-y-3">
    <h1 className="text-xl font-bold">Step 2: Interests Quiz</h1>
    <p className="text-sm">Question {i+1} of 12</p>
    <div className="h-2 w-full bg-slate-200"><div className="h-full bg-blue-600" style={{width:`${((i+1)/12)*100}%`}}/></div>
    <h2 className="font-semibold">{q.text}</h2>
    {q.options.map(opt=><label key={opt.key} className="block rounded border bg-white p-2"><input type="radio" name={q.id} checked={answers[q.id]===opt.key} onChange={()=>setAnswers({...answers,[q.id]:opt.key})}/> {opt.key}. {opt.text}</label>)}
    <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={()=>setI(i+1)}>Next</button>
  </div>;
}
