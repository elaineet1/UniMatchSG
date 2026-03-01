import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

const prisma = new PrismaClient();

async function main() {
  const raw = fs.readFileSync(path.join(process.cwd(), "prisma/data/courses.json"), "utf-8");
  const entries = JSON.parse(raw) as any[];

  for (const item of entries) {
    const uni = await prisma.university.upsert({ where: { name: item.university }, update: { websiteUrl: item.websiteUrl }, create: { name: item.university, websiteUrl: item.websiteUrl } });
    const course = await prisma.course.upsert({
      where: { slug: item.slug },
      update: { universityId: uni.id, name: item.name, faculty: item.faculty, description: item.description, officialUrl: item.officialUrl, tags: JSON.stringify(item.tags), majors: JSON.stringify(item.majors), doubleDegree: item.doubleDegree, typicalRoles: JSON.stringify(item.typicalRoles), aiRiskNote: item.aiRiskNote, aiRiskSources: JSON.stringify(item.aiRiskSources) },
      create: { universityId: uni.id, slug: item.slug, name: item.name, faculty: item.faculty, description: item.description, officialUrl: item.officialUrl, tags: JSON.stringify(item.tags), majors: JSON.stringify(item.majors), doubleDegree: item.doubleDegree, typicalRoles: JSON.stringify(item.typicalRoles), aiRiskNote: item.aiRiskNote, aiRiskSources: JSON.stringify(item.aiRiskSources) }
    });

    await prisma.prerequisite.deleteMany({ where: { courseId: course.id } });
    await prisma.iGP.deleteMany({ where: { courseId: course.id } });
    await prisma.outcome.deleteMany({ where: { courseId: course.id } });
    await prisma.intake.deleteMany({ where: { courseId: course.id } });

    await prisma.prerequisite.createMany({ data: item.prerequisites.map((p:any)=>({ courseId: course.id, requirementText: p.requirementText, sourceUrls: JSON.stringify(p.sourceUrls), specialNotes: p.specialNotes ?? null })) });
    await prisma.iGP.createMany({ data: item.igp.map((x:any)=>({ courseId: course.id, intakeYear: x.intakeYear, igp10Text: x.igp10Text, igp90Text: x.igp90Text, igp10Rp: x.igp10Rp, igp90Rp: x.igp90Rp, sourceUrls: JSON.stringify(x.sourceUrls) })) });
    await prisma.outcome.createMany({ data: item.outcomes.map((x:any)=>({ courseId: course.id, year: x.year, startingSalaryMedian: x.startingSalaryMedian ?? null, startingSalaryMean: x.startingSalaryMean ?? null, employmentRateOverall: x.employmentRateOverall ?? null, employmentRateFTPerm: x.employmentRateFTPerm ?? null, sourceUrls: JSON.stringify(x.sourceUrls) })) });
    await prisma.intake.createMany({ data: item.intakes.map((x:any)=>({ courseId: course.id, year: x.year, intakeSize: x.intakeSize ?? null, sourceUrls: JSON.stringify(x.sourceUrls) })) });
  }
}

main().finally(()=>prisma.$disconnect());
