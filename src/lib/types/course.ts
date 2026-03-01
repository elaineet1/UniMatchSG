import { InterestTag } from "@/lib/constants/tags";

export type CourseView = {
  id: string;
  slug: string;
  university: string;
  name: string;
  faculty: string;
  description: string;
  officialUrl: string;
  tags: InterestTag[];
  prerequisites: { requirementText: string; sourceUrls: string[]; specialNotes?: string | null }[];
  igp?: { intakeYear:number; igp10Text:string; igp90Text:string; igp10Rp:number; igp90Rp:number; sourceUrls:string[] };
  outcome?: { year:number; startingSalaryMedian?:number|null; employmentRateFTPerm?:number|null; sourceUrls:string[] };
};
