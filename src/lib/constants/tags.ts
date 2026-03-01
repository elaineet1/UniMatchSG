export const TAGS = [
  "computing_software","data_ai","engineering","business_management","finance_accounting","economics_policy","law_public_policy","healthcare_biomedical","life_sciences_chemistry","design_creative_media","communications_marketing","education_psychology","social_sciences","humanities_languages","entrepreneurship_product","operations_logistics"
] as const;

export type InterestTag = (typeof TAGS)[number];

export const TAG_LABELS: Record<InterestTag, string> = {
  computing_software: "Computing & Software",
  data_ai: "Data & AI",
  engineering: "Engineering",
  business_management: "Business Management",
  finance_accounting: "Finance & Accounting",
  economics_policy: "Economics & Policy",
  law_public_policy: "Law & Public Policy",
  healthcare_biomedical: "Healthcare & Biomedical",
  life_sciences_chemistry: "Life Sciences & Chemistry",
  design_creative_media: "Design & Creative Media",
  communications_marketing: "Communications & Marketing",
  education_psychology: "Education & Psychology",
  social_sciences: "Social Sciences",
  humanities_languages: "Humanities & Languages",
  entrepreneurship_product: "Entrepreneurship & Product",
  operations_logistics: "Operations & Logistics"
};
