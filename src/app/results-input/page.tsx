"use client";
import { useState } from "react";
import { calcUas, Grade } from "@/lib/rp/calculator";
import { useAppStore } from "@/state/useAppStore";
import Link from "next/link";

const grades: Grade[] = ["A","B","C","D","E","S","U"];

export default function ResultsInputPage() {
  const setUserRp = useAppStore(s=>s.setUserRp);
  const [h2, setH2] = useState([{name:"H2 Math",grade:"A" as Grade},{name:"H2 Subject 2",grade:"B" as Grade},{name:"H2 Subject 3",grade:"B" as Grade}]);
  const [gp, setGp] = useState<Grade>("B");
  const [h1Content, setH1Content] = useState<Grade|"">("");
  const [mtl, setMtl] = useState<Grade|"">("");
  const [pw, setPw] = useState("Pass");

  const result = calcUas({ h2, gp, h1Content: h1Content || undefined, mtl: mtl || null });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Step 1: Enter Results</h1>
      <p className="text-sm">PW is Pass/Fail and not counted in UAS.</p>
      {h2.map((s, i)=><div key={i} className="flex gap-2"><input className="border p-2" value={s.name} onChange={e=>setH2(v=>v.map((x,idx)=>idx===i?{...x,name:e.target.value}:x))}/><select className="border p-2" value={s.grade} onChange={e=>setH2(v=>v.map((x,idx)=>idx===i?{...x,grade:e.target.value as Grade}:x))}>{grades.map(g=><option key={g}>{g}</option>)}</select></div>)}
      {h2.length<4 && <button className="rounded bg-slate-200 px-2 py-1" onClick={()=>setH2([...h2,{name:`H2 Subject ${h2.length+1}`,grade:"C"}])}>Add 4th H2</button>}
      <label className="block">GP <select className="ml-2 border p-2" value={gp} onChange={e=>setGp(e.target.value as Grade)}>{grades.map(g=><option key={g}>{g}</option>)}</select></label>
      <label className="block">Optional H1 Content <select className="ml-2 border p-2" value={h1Content} onChange={e=>setH1Content(e.target.value as Grade|"")}><option value="">Not taken</option>{grades.map(g=><option key={g}>{g}</option>)}</select></label>
      <label className="block">Optional MTL/HMTL <select className="ml-2 border p-2" value={mtl} onChange={e=>setMtl(e.target.value as Grade|"")}><option value="">Not taken</option>{grades.map(g=><option key={g}>{g}</option>)}</select></label>
      <label className="block">PW <select className="ml-2 border p-2" value={pw} onChange={e=>setPw(e.target.value)}><option>Pass</option><option>Fail</option></select></label>
      <div className="rounded border bg-white p-3">
        <p>Core UAS (out of 70): <b>{result.coreUas.toFixed(2)}</b></p>
        <p>Best UAS (after optional boosts): <b>{result.bestUas.toFixed(2)}</b></p>
        <p className="text-sm">Counted optional: {result.countedFourth ? "4th subject " : ""}{result.countedMtl ? "MTL" : "none"}.</p>
      </div>
      <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={()=>setUserRp(result.bestUas)}>Save UAS</button>
      <Link href="/quiz" className="block text-blue-700 underline">Next: Interests Quiz</Link>
    </div>
  );
}
