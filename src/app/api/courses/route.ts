import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await prisma.course.findMany({ include: { university: true, prerequisites: true, igps: { orderBy: { intakeYear: "desc" }, take: 1 }, outcomes: { orderBy: { year: "desc" }, take: 1 } } });
  return NextResponse.json(courses.map(c=>({
    id: c.id, slug: c.slug, university: c.university.name, name: c.name, faculty: c.faculty, description: c.description, officialUrl: c.officialUrl,
    tags: JSON.parse(c.tags),
    prerequisites: c.prerequisites.map(p=>({ requirementText: p.requirementText, sourceUrls: JSON.parse(p.sourceUrls), specialNotes: p.specialNotes })),
    igp: c.igps[0] ? { ...c.igps[0], sourceUrls: JSON.parse(c.igps[0].sourceUrls)} : null,
    outcome: c.outcomes[0] ? { ...c.outcomes[0], sourceUrls: JSON.parse(c.outcomes[0].sourceUrls)} : null
  })));
}
