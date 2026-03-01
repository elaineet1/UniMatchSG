export type Grade = "A"|"B"|"C"|"D"|"E"|"S"|"U";
export type Subject = { name: string; level: "H2"|"H1"|"GP"|"MTL"; grade: Grade };

// AY2026-style 70RP core references (manual update):
// MOE/JC ECG pages describing 70-RP core and PW pass/fail (not counted).
const H2_POINTS: Record<Grade, number> = { A:20, B:17.5, C:15, D:12.5, E:10, S:5, U:0 };
const H1_POINTS: Record<Grade, number> = { A:10, B:8.75, C:7.5, D:6.25, E:5, S:2.5, U:0 };

export function points(level: "H2"|"H1"|"GP"|"MTL", grade: Grade): number {
  return level === "H2" ? H2_POINTS[grade] : H1_POINTS[grade];
}

export function calcUas(input: {
  h2: {name:string;grade:Grade}[];
  gp: Grade;
  h1Content?: Grade;
  mtl?: Grade | null;
}) {
  const h2Sorted = [...input.h2].sort((a,b)=>points("H2", b.grade)-points("H2", a.grade));
  const best3 = h2Sorted.slice(0,3);
  const fourth = h2Sorted[3];

  const coreRaw = best3.reduce((s,x)=>s+points("H2",x.grade),0) + points("GP", input.gp);
  const coreUas = coreRaw;

  const fourthH1 = input.h1Content ? points("H1", input.h1Content) : fourth ? points("H2", fourth.grade)/2 : 0;
  const mtlH1 = input.mtl ? points("H1", input.mtl) : 0;

  const withFourth = fourthH1 ? (coreRaw + fourthH1) / 80 * 70 : coreUas;
  const withMtl = mtlH1 ? (coreRaw + mtlH1) / 80 * 70 : coreUas;
  const withBoth = (fourthH1 && mtlH1) ? (coreRaw + fourthH1 + mtlH1) / 90 * 70 : coreUas;

  const bestUas = Math.max(coreUas, withFourth, withMtl, withBoth);
  return { coreUas, bestUas, best3, countedFourth: bestUas===withFourth||bestUas===withBoth, countedMtl: bestUas===withMtl||bestUas===withBoth };
}
