import { prisma } from "@/lib/db/prisma";

export default async function CourseDetail({ params }: { params: { slug: string } }) {
  const c = await prisma.course.findUnique({ where: { slug: params.slug }, include: { university: true, prerequisites: true, igps: { orderBy: { intakeYear: "desc" }, take: 1 }, outcomes: { orderBy: { year: "desc" }, take: 1 }, intakes: { orderBy: { year: "desc" }, take: 1 } } });
  if (!c) return <div>Course not found.</div>;
  const tags: string[] = JSON.parse(c.tags);
  const roles: string[] = JSON.parse(c.typicalRoles);
  const majors: string[] = JSON.parse(c.majors);
  return <div className="space-y-4">
    <h1 className="text-2xl font-bold">{c.name}</h1>
    <p>{c.university.name} · {c.faculty}</p>
    <p>{c.description}</p>
    <p className="text-sm">Tags: {tags.join(", ")}</p>
    <p className="text-sm">Majors/specialisations: {majors.join(", ")}</p>
    <p className="text-sm">Typical roles: {roles.join(", ")}</p>
    <section><h2 className="font-semibold">Prerequisites</h2>{c.prerequisites.map(p=><div key={p.id}><p>{p.requirementText}</p><ul>{JSON.parse(p.sourceUrls).map((u:string)=><li key={u}><a className="text-blue-700 underline" href={u}>{u}</a></li>)}</ul></div>)}</section>
    <section><h2 className="font-semibold">IGP</h2>{c.igps[0] && <p>{c.igps[0].intakeYear}: {c.igps[0].igp10Text}/{c.igps[0].igp90Text} ({c.igps[0].igp10Rp}/{c.igps[0].igp90Rp})</p>}</section>
    <section><h2 className="font-semibold">Salary & Employment</h2>{c.outcomes[0] && <p>{c.outcomes[0].year}: Median {c.outcomes[0].startingSalaryMedian}, FT perm {c.outcomes[0].employmentRateFTPerm}%</p>}</section>
    <section><h2 className="font-semibold">Citations</h2>
      {[...(c.igps[0] ? JSON.parse(c.igps[0].sourceUrls) : []), ...(c.outcomes[0] ? JSON.parse(c.outcomes[0].sourceUrls) : []), ...(c.intakes[0] ? JSON.parse(c.intakes[0].sourceUrls) : []), ...c.prerequisites.flatMap(p=>JSON.parse(p.sourceUrls))].map((u:string)=><div key={u}><a className="text-blue-700 underline" href={u}>{u}</a></div>)}
    </section>
    <p className="text-xs text-slate-600">Disclaimer: estimates only, refer to official sources.</p>
  </div>;
}
