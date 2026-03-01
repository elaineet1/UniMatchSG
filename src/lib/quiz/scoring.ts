import { TAGS, InterestTag } from "@/lib/constants/tags";
import { QUIZ_QUESTIONS } from "./questions";

export type QuizFlags = {
  prefers_people_work: boolean;
  prefers_analytical_work: boolean;
  prefers_creative_work: boolean;
  avoid_heavy_math: boolean;
  avoid_heavy_coding: boolean;
  likes_structure_vs_exploration: "structure"|"exploration"|"balanced";
};

export type QuizProfile = { tagPoints: Record<InterestTag, number>; topTags: InterestTag[]; flags: QuizFlags };

export function scoreQuiz(answers: Record<string,string>): QuizProfile {
  const tagPoints = Object.fromEntries(TAGS.map(t=>[t,0])) as Record<InterestTag,number>;
  let ppl=0, ana=0, cre=0, structure=0, exploration=0;
  let avoidMath=false, avoidCoding=false, lighterMath=false, minimalCoding=false;

  for (const q of QUIZ_QUESTIONS) {
    const opt = q.options.find((o)=>o.key===answers[q.id]);
    if (!opt) continue;
    for (const [tag, value] of Object.entries(opt.add ?? {})) tagPoints[tag as InterestTag] += value ?? 0;
    const f = opt.flags ?? {};
    ppl += Number(f.prefers_people_work_counter ?? 0);
    ana += Number(f.prefers_analytical_work_counter ?? 0);
    cre += Number(f.prefers_creative_work_counter ?? 0);
    structure += Number(f.structure_votes ?? 0);
    exploration += Number(f.exploration_votes ?? 0);
    avoidMath ||= f.avoid_heavy_math === true;
    avoidCoding ||= f.avoid_heavy_coding === true;
    lighterMath ||= f.lighter_math_selected === true;
    minimalCoding ||= f.minimal_coding_selected === true;
  }

  const sorted = [...TAGS].sort((a,b)=>tagPoints[b]-tagPoints[a]);
  const topTags = sorted.slice(0,5);

  const mathHeavy = tagPoints.engineering + tagPoints.data_ai + tagPoints.finance_accounting;
  const nonMathHeavy = tagPoints.humanities_languages + tagPoints.design_creative_media + tagPoints.communications_marketing;
  if (lighterMath && mathHeavy < nonMathHeavy) avoidMath = true;

  if (minimalCoding && !sorted.slice(0,8).includes("computing_software")) avoidCoding = true;

  return {
    tagPoints,
    topTags,
    flags: {
      prefers_people_work: ppl >= 2,
      prefers_analytical_work: ana >= 2,
      prefers_creative_work: cre >= 2,
      avoid_heavy_math: avoidMath,
      avoid_heavy_coding: avoidCoding,
      likes_structure_vs_exploration: structure - exploration >= 2 ? "structure" : exploration - structure >= 2 ? "exploration" : "balanced"
    }
  };
}

export function deriveUniStyleProfile(answers: Record<string,string>) {
  let seminar=0, lecture=0, mixed=0, team=0, solo=0, flex=0, industry=0, research=0;
  const u1=answers.U1, u2=answers.U2, u3=answers.U3, u4=answers.U4;
  if (u1==="A") seminar+=2; else if (u1==="B") lecture+=2; else if (u1==="C") mixed+=2; else if (u1==="D") {lecture+=1; flex+=1;} else mixed+=1;
  if (u2==="A") seminar+=2; else if (u2==="B") seminar+=1; else if (u2==="C") mixed+=1; else if (u2==="D") lecture+=1; else mixed+=1;
  if (u3==="A") team+=2; else if (u3==="B") team+=1; else if (u3==="C") solo+=2; else {team+=1; if (u3==="D") solo+=1;}
  if (u4==="A") industry+=2; else if (u4==="B") research+=2; else if (u4==="D") flex+=2;

  return {
    learningStyle: seminar-lecture>=2 ? "seminar" : lecture-seminar>=2 ? "lecture" : "mixed",
    teamworkLevel: team-solo>=2 ? "high" : solo-team>=2 ? "low" : "medium",
    structurePreference: flex >= 3 ? "flexible" : "structured",
    careerFocus: industry-research>=2 ? "internships" : research-industry>=2 ? "research" : "balanced"
  } as const;
}
