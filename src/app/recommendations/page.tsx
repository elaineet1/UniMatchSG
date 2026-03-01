"use client";
import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@/state/useAppStore";
import { abaRecommended, baseFitScore, chanceLabel, eligibilityTier } from "@/lib/reco/engine";
import Link from "next/link";
import { CourseView } from "@/lib/types/course";

const tierTitle: Record<number,string> = {1:"Eligible and realistic",2:"Eligible, but competitive (ABA or close reach)",3:"Likely realistic, prerequisites unclear",4:"Eligible, but very competitive",5:"High interest, but prerequisites not met"};

export default function RecommendationsPage() {
  const { userRp, topTags, quizTagPoints, flags, uniStyle } = useAppStore();
  const [courses, setCourses] = useState<CourseView[]>([]);
  const [eligibleOnly, setEligibleOnly] = useState(false);
  const [realism, setRealism] = useState<"all"|"mostly"|"only">("mostly");
  const [prioritiseEligibility] = useState(true);

  useEffect(()=>{ fetch("/api/courses").then(r=>r.json()).then(setCourses).catch(()=>{}); },[]);

  const recs = useMemo(()=>courses.map(c=>{
    const prereqStatus = c.prerequisites.length ? "met" : "unknown";
    const igp10 = c.igp?.igp10Rp ?? 75;
    const igp90 = c.igp?.igp90Rp ?? 85;
    const chance = chanceLabel(userRp, igp10, igp90, prereqStatus !== "not_met");
    const close = userRp >= igp10 - 2.5;
    const aba = abaRecommended(userRp, igp10, 6, prereqStatus !== "not_met");
    const base = baseFitScore(c.tags, topTags as any, quizTagPoints as any, flags);
    const uniStyleFit = (c.university==="SMU" && uniStyle?.learningStyle==="seminar" ? 2 : 0) + ((c.university==="NUS"||c.university==="NTU") && uniStyle?.learningStyle==="lecture" ? 2 : 0);
    const tier = eligibilityTier(prereqStatus as any, chance, close, aba);
    return { ...c, prereqStatus, chance, close, aba, adjustedFitScore: base, uniStyleFit, tier, salary: c.outcome?.startingSalaryMedian ?? 0 };
  }), [courses, userRp, topTags, quizTagPoints, flags, uniStyle]);

  const visible = recs.filter(r=>!eligibleOnly || r.prereqStatus==="met").filter(r=>realism==="all" ? true : realism==="mostly" ? r.tier!==4 || r.adjustedFitScore>=20 : [1,2].includes(r.tier)).sort((a,b)=>b.adjustedFitScore-a.adjustedFitScore || (a.chance===b.chance?0:a.chance==="High"?-1:b.chance==="High"?1:a.chance==="Medium"?-1:1) || b.uniStyleFit-a.uniStyleFit || b.salary-a.salary);

  const grouped = [1,2,3,4,5].map(t=>({tier:t, items: visible.filter(v=>v.tier===t)})).filter(g=>g.items.length);

  return <div className="space-y-4">
    <h1 className="text-xl font-bold">Recommendations</h1>
    <p className="text-sm">Admissions chance is an estimate only. Verify official criteria and yearly IGP updates.</p>
    <div className="rounded border bg-white p-3 text-sm">
      <label><input type="checkbox" checked={eligibleOnly} onChange={e=>setEligibleOnly(e.target.checked)}/> Show only courses I am eligible for (prereqs met)</label>
      <div className="mt-2">Reach filter:
        <button className="ml-2 border px-2" onClick={()=>setRealism("all")}>Show all</button>
        <button className="ml-2 border px-2" onClick={()=>setRealism("mostly")}>Mostly realistic</button>
        <button className="ml-2 border px-2" onClick={()=>setRealism("only")}>Only realistic</button>
      </div>
      <p>Prioritise eligibility: {prioritiseEligibility ? "ON" : "OFF"}</p>
    </div>

    {grouped.map(g=><section key={g.tier}><h2 className="font-semibold">{tierTitle[g.tier]}</h2><div className="space-y-2">{g.items.map(c=><article key={c.slug} className="rounded border bg-white p-3">
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded bg-green-100 px-2 py-1">Chance: {c.chance}</span>
        <span className="rounded bg-slate-100 px-2 py-1">Eligibility: {c.prereqStatus==="met"?"Prereqs met":c.prereqStatus==="not_met"?"Prereqs not met":"Prereqs unknown"}</span>
        <span className="rounded bg-indigo-100 px-2 py-1">Fit: {c.adjustedFitScore>=20?"Strong fit":c.adjustedFitScore>=12?"Good fit":"Some fit"}</span>
        {c.tier===2 && <span className="rounded bg-amber-100 px-2 py-1">Close reach</span>}
        {c.aba && <span className="rounded bg-purple-100 px-2 py-1">ABA recommended</span>}
      </div>
      <h3 className="font-medium">{c.name} ({c.university})</h3><p className="text-sm">{c.faculty}</p>
      <p className="text-sm">IGP 10th/90th: {c.igp?.igp10Text} ({c.igp?.igp10Rp}) / {c.igp?.igp90Text} ({c.igp?.igp90Rp})</p>
      <Link className="text-blue-700 underline" href={`/course/${c.slug}`}>View details & citations</Link>
    </article>)}</div></section>)}
  </div>;
}
