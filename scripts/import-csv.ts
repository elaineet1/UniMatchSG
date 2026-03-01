import fs from "node:fs";
import Papa from "papaparse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const file = process.argv[2];
if (!file) throw new Error("Usage: npm run import:csv -- ./path.csv");
const csv = fs.readFileSync(file, "utf-8");
const parsed = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });

(async () => {
  let success = 0, failed = 0;
  for (const row of parsed.data) {
    if (!row.slug || !row.university || !row.name) { failed++; continue; }
    const uni = await prisma.university.upsert({ where: { name: row.university }, update: { websiteUrl: row.universityWebsite ?? "" }, create: { name: row.university, websiteUrl: row.universityWebsite ?? "" } });
    await prisma.course.upsert({ where: { slug: row.slug }, update: { universityId: uni.id, name: row.name, faculty: row.faculty ?? "", description: row.description ?? "", officialUrl: row.officialUrl ?? "", tags: row.tags ?? "[]", majors: row.majors ?? "[]", typicalRoles: row.typicalRoles ?? "[]", aiRiskNote: row.aiRiskNote ?? "", aiRiskSources: row.aiRiskSources ?? "[]" }, create: { universityId: uni.id, slug: row.slug, name: row.name, faculty: row.faculty ?? "", description: row.description ?? "", officialUrl: row.officialUrl ?? "", tags: row.tags ?? "[]", majors: row.majors ?? "[]", typicalRoles: row.typicalRoles ?? "[]", aiRiskNote: row.aiRiskNote ?? "", aiRiskSources: row.aiRiskSources ?? "[]" } });
    success++;
  }

  await prisma.adminImportLog.create({ data: { fileName: file, statsJson: JSON.stringify({ success, failed }) } });
  console.log({ success, failed });
  await prisma.$disconnect();
})();
