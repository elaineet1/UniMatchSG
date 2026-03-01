import { RECO_CONFIG } from "./config";
import { InterestTag } from "@/lib/constants/tags";

export type Chance = "High"|"Medium"|"Low";
export type PrereqStatus = "met"|"not_met"|"unknown";
export type Tier = 1|2|3|4|5;

export function chanceLabel(userRp:number, igp10:number, igp90:number, prereqMet:boolean): Chance {
  if (!prereqMet) return "Low";
  if (userRp>=igp90) return "High";
  if (userRp>=igp10) return "Medium";
  return "Low";
}

export function abaRecommended(userRp:number, igp10:number, portfolioScore:number, prereqMet:boolean) {
  if (!prereqMet) return false;
  return userRp < igp10 && userRp >= igp10 - RECO_CONFIG.abaDelta && portfolioScore >= RECO_CONFIG.abaPortfolioThreshold;
}

export function eligibilityTier(prereq:PrereqStatus, chance:Chance, close:boolean, aba:boolean): Tier {
  if (prereq === "met" && (chance === "High" || chance === "Medium")) return 1;
  if (prereq === "met" && chance === "Low" && (aba || close)) return 2;
  if (prereq === "unknown" && (chance === "High" || chance === "Medium")) return 3;
  if (prereq === "met" && chance === "Low") return 4;
  return 5;
}

export function baseFitScore(courseTags: InterestTag[], topTags: InterestTag[], tagPoints: Record<InterestTag, number>, flags: {prefers_people_work:boolean;prefers_analytical_work:boolean;prefers_creative_work:boolean;avoid_heavy_coding:boolean;avoid_heavy_math:boolean;}) {
  let score = topTags.reduce((s,t)=>s + (courseTags.includes(t) ? tagPoints[t] : 0), 0);
  if (flags.prefers_people_work && courseTags.some(t=>["communications_marketing","business_management","education_psychology","healthcare_biomedical"].includes(t))) score += 1;
  if (flags.prefers_analytical_work && courseTags.some(t=>["data_ai","finance_accounting","economics_policy","engineering"].includes(t))) score += 1;
  if (flags.prefers_creative_work && courseTags.includes("design_creative_media")) score += 1;
  if (flags.avoid_heavy_coding && courseTags[0] === "computing_software") score -= 2;
  if (flags.avoid_heavy_math && ["engineering","data_ai"].includes(courseTags[0])) score -= 2;
  return score;
}
