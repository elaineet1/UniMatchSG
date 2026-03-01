"use client";
import { create } from "zustand";
import { InterestTag } from "@/lib/constants/tags";
import { QuizFlags } from "@/lib/quiz/scoring";

type UniStyle = { learningStyle:"seminar"|"lecture"|"mixed"; teamworkLevel:"high"|"medium"|"low"; structurePreference:"structured"|"flexible"; careerFocus:"internships"|"research"|"balanced"; };

type State = {
  userRp: number;
  quizTagPoints: Record<InterestTag, number>;
  topTags: InterestTag[];
  flags: QuizFlags;
  uniStyle?: UniStyle;
  setUserRp: (v:number)=>void;
  setQuiz: (v:{quizTagPoints:Record<InterestTag,number>;topTags:InterestTag[];flags:QuizFlags})=>void;
  setUniStyle: (v:UniStyle)=>void;
};

export const useAppStore = create<State>((set) => ({
  userRp: 0,
  quizTagPoints: {} as Record<InterestTag,number>,
  topTags: [],
  flags: { prefers_people_work:false,prefers_analytical_work:false,prefers_creative_work:false,avoid_heavy_math:false,avoid_heavy_coding:false,likes_structure_vs_exploration:"balanced" },
  setUserRp: (userRp)=>set({userRp}),
  setQuiz: ({quizTagPoints,topTags,flags})=>set({quizTagPoints,topTags,flags}),
  setUniStyle: (uniStyle)=>set({uniStyle})
}));
