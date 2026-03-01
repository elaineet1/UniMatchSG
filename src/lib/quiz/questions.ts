import { InterestTag } from "@/lib/constants/tags";

export type Opt = { key:string; text:string; add?: Partial<Record<InterestTag, number>>; flags?: Partial<Record<string, number|boolean>> };
export type Q = { id: string; text: string; options: Opt[] };

export const QUIZ_QUESTIONS: Q[] = [
{id:"Q1",text:"Which type of activity sounds most enjoyable?",options:[
{key:"A",text:"Building an app, website, or software tool.",add:{computing_software:3,entrepreneurship_product:1}},
{key:"B",text:"Analysing data to find patterns and make predictions.",add:{data_ai:3,economics_policy:1}},
{key:"C",text:"Designing visuals, videos, or creative content.",add:{design_creative_media:3,communications_marketing:1}},
{key:"D",text:"Leading a group to plan and run an event or project.",add:{business_management:3,entrepreneurship_product:2}},
{key:"E",text:"Understanding how society works and why people behave certain ways.",add:{social_sciences:3,education_psychology:1}}]},
{id:"Q2",text:"What kind of problems do you prefer?",options:[
{key:"A",text:"Clear right or wrong answers.",add:{engineering:2,operations_logistics:2},flags:{structure_votes:1}},
{key:"B",text:"Problems with numbers and logic.",add:{data_ai:2,finance_accounting:2},flags:{prefers_analytical_work_counter:1}},
{key:"C",text:"Open-ended problems with many possible solutions.",add:{design_creative_media:2,entrepreneurship_product:2},flags:{prefers_creative_work_counter:1,exploration_votes:1}},
{key:"D",text:"Problems involving people, teamwork, and communication.",add:{communications_marketing:2,business_management:2},flags:{prefers_people_work_counter:1}},
{key:"E",text:"Problems involving rules, fairness, or policies.",add:{law_public_policy:2,economics_policy:2}}]},
{id:"Q3",text:"Pick the statement that fits you best.",options:[
{key:"A",text:"I like learning how computers work and how to make them do useful things.",add:{computing_software:3,data_ai:1}},
{key:"B",text:"I like understanding money, markets, and how businesses grow.",add:{finance_accounting:3,business_management:1}},
{key:"C",text:"I like helping people, improving wellbeing, or working in healthcare-related areas.",add:{healthcare_biomedical:3,education_psychology:1},flags:{prefers_people_work_counter:1}},
{key:"D",text:"I like learning about science (bio/chem) and how the body or nature works.",add:{life_sciences_chemistry:3,healthcare_biomedical:1}},
{key:"E",text:"I like writing, reading, or working with languages and ideas.",add:{humanities_languages:3,communications_marketing:1}}]},
{id:"Q4",text:"In group work, you usually prefer to:",options:[
{key:"A",text:"Code/build the solution.",add:{computing_software:3}},
{key:"B",text:"Do research and analyse information.",add:{social_sciences:2,data_ai:1}},
{key:"C",text:"Present, persuade, and communicate ideas.",add:{communications_marketing:3},flags:{prefers_people_work_counter:1}},
{key:"D",text:"Organise tasks, timelines, and logistics.",add:{operations_logistics:2,business_management:1},flags:{structure_votes:1}},
{key:"E",text:"Think about ethics, fairness, and what rules should be.",add:{law_public_policy:3}}]},
{id:"Q5",text:"Which subject-style do you enjoy more?",options:[
{key:"A",text:"Math and solving structured problems.",add:{engineering:2,finance_accounting:1,data_ai:1},flags:{prefers_analytical_work_counter:1}},
{key:"B",text:"Essay writing and discussions.",add:{humanities_languages:2,social_sciences:1}},
{key:"C",text:"Practical building and hands-on tasks.",add:{engineering:2,entrepreneurship_product:1}},
{key:"D",text:"Research, reading, and presenting findings.",add:{economics_policy:2,social_sciences:1}},
{key:"E",text:"Design and creative expression.",add:{design_creative_media:3},flags:{prefers_creative_work_counter:1}}]},
{id:"Q6",text:"If you had to choose, which outcome matters most to you?",options:[
{key:"A",text:"High earning potential.",add:{finance_accounting:2,computing_software:1}},
{key:"B",text:"Meaningful impact on society.",add:{law_public_policy:2,economics_policy:1,healthcare_biomedical:1}},
{key:"C",text:"Job stability and clear career path.",add:{operations_logistics:2,engineering:1,finance_accounting:1}},
{key:"D",text:"Freedom to create and explore.",add:{design_creative_media:2,humanities_languages:1},flags:{exploration_votes:1}},
{key:"E",text:"Starting or building something new.",add:{entrepreneurship_product:3,business_management:1}}]},
{id:"Q7",text:"Which type of work environment sounds best?",options:[
{key:"A",text:"Solving technical problems quietly, deep focus.",add:{computing_software:2,data_ai:2},flags:{prefers_analytical_work_counter:1}},
{key:"B",text:"Working with clients and people every day.",add:{communications_marketing:2,business_management:2},flags:{prefers_people_work_counter:1}},
{key:"C",text:"Planning and running operations, making sure things work smoothly.",add:{operations_logistics:3,business_management:1},flags:{structure_votes:1}},
{key:"D",text:"Research and analysis, reading and writing reports.",add:{economics_policy:2,social_sciences:2}},
{key:"E",text:"Studio or creative environment.",add:{design_creative_media:3},flags:{prefers_creative_work_counter:1}}]},
{id:"Q8",text:"How do you feel about coding?",options:[
{key:"A",text:"I like it, I want to do more.",add:{computing_software:3,data_ai:1}},
{key:"B",text:"I am open to learning if needed.",add:{data_ai:2,entrepreneurship_product:1}},
{key:"C",text:"I do not like it, prefer minimal coding.",add:{communications_marketing:1,business_management:1},flags:{avoid_heavy_coding:true,minimal_coding_selected:true}},
{key:"D",text:"I am not sure yet.",add:{social_sciences:1}},
{key:"E",text:"I prefer non-coding paths.",add:{humanities_languages:1,law_public_policy:1},flags:{avoid_heavy_coding:true,minimal_coding_selected:true}}]},
{id:"Q9",text:"How do you feel about heavy math?",options:[
{key:"A",text:"I like math a lot.",add:{engineering:3,data_ai:1},flags:{prefers_analytical_work_counter:1}},
{key:"B",text:"I can handle it if needed.",add:{finance_accounting:2,economics_policy:1}},
{key:"C",text:"I prefer lighter math.",add:{business_management:1,communications_marketing:1},flags:{avoid_heavy_math:true,lighter_math_selected:true}},
{key:"D",text:"I dislike math.",add:{humanities_languages:1,social_sciences:1},flags:{avoid_heavy_math:true,lighter_math_selected:true}},
{key:"E",text:"Not sure.",add:{education_psychology:1}}]},
{id:"Q10",text:"Which topic do you naturally read/watch more?",options:[
{key:"A",text:"Tech gadgets, apps, how things work.",add:{computing_software:2,data_ai:1}},
{key:"B",text:"Money, investing, business news.",add:{finance_accounting:2,economics_policy:1}},
{key:"C",text:"Health, medicine, fitness, wellbeing.",add:{healthcare_biomedical:2,life_sciences_chemistry:1}},
{key:"D",text:"Society, trends, politics, world issues.",add:{economics_policy:1,law_public_policy:1,social_sciences:1}},
{key:"E",text:"Art, design, content creation.",add:{design_creative_media:2,communications_marketing:1}}]},
{id:"Q11",text:"Pick a project you would enjoy most:",options:[
{key:"A",text:"Build a simple app that solves a daily problem.",add:{computing_software:2,entrepreneurship_product:2}},
{key:"B",text:"Analyse a dataset and explain insights in a dashboard.",add:{data_ai:3}},
{key:"C",text:"Plan a campaign to promote a product or event.",add:{communications_marketing:2,business_management:1}},
{key:"D",text:"Investigate a social issue and propose solutions.",add:{social_sciences:2,economics_policy:1,law_public_policy:1}},
{key:"E",text:"Create a branding and content package.",add:{design_creative_media:2,communications_marketing:1}}]},
{id:"Q12",text:"Which statement is closest to your personality?",options:[
{key:"A",text:"I am systematic, I like clear steps and structure.",add:{operations_logistics:2,finance_accounting:1},flags:{structure_votes:1}},
{key:"B",text:"I am curious, I like exploring and learning broadly.",add:{humanities_languages:1,social_sciences:1},flags:{exploration_votes:1}},
{key:"C",text:"I like persuading and communicating with people.",add:{communications_marketing:3},flags:{prefers_people_work_counter:1}},
{key:"D",text:"I like building things and improving them.",add:{engineering:1,entrepreneurship_product:2,computing_software:1}},
{key:"E",text:"I like caring for others or supporting people’s growth.",add:{education_psychology:3,healthcare_biomedical:1},flags:{prefers_people_work_counter:1}}]}
];

export const UNI_STYLE_Q = [
{id:"U1",text:"Which learning format do you prefer most?",options:[{key:"A",text:"Small class discussions every lesson"},{key:"B",text:"Mostly lectures, with occasional tutorials"},{key:"C",text:"Mix of both, no strong preference"},{key:"D",text:"Self-study, minimal class discussion"},{key:"E",text:"Not sure"}]},
{id:"U2",text:"How comfortable are you with speaking up in class?",options:[{key:"A",text:"Very comfortable, I enjoy it"},{key:"B",text:"Comfortable if prepared"},{key:"C",text:"Neutral"},{key:"D",text:"Prefer not to speak much"},{key:"E",text:"Not sure"}]},
{id:"U3",text:"For projects, you prefer:",options:[{key:"A",text:"Team projects most of the time"},{key:"B",text:"Mix of team and individual"},{key:"C",text:"Mostly individual work"},{key:"D",text:"Depends on module"},{key:"E",text:"Not sure"}]},
{id:"U4",text:"What matters more to you in university?",options:[{key:"A",text:"Strong internships and industry exposure"},{key:"B",text:"Research opportunities and deep academic learning"},{key:"C",text:"Balanced"},{key:"D",text:"Flexible curriculum to explore"},{key:"E",text:"Not sure"}]}
] as const;
