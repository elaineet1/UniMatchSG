import { revalidatePath } from "next/cache";

async function verify(formData: FormData) {
  "use server";
  const provided = String(formData.get("adminKey") ?? "");
  const expected = process.env.ADMIN_KEY ?? "";
  if (provided !== expected) return { ok: false, message: "Invalid ADMIN_KEY." };
  revalidatePath("/admin");
  return { ok: true, message: "Key verified. Use CLI import for now: npm run import:csv -- ./file.csv" };
}

export default function AdminPage() {
  return <div className="space-y-4">
    <h1 className="text-xl font-bold">Admin (protected by ADMIN_KEY)</h1>
    <form action={verify} className="space-y-2 rounded border bg-white p-4">
      <input className="w-full border p-2" name="adminKey" type="password" placeholder="Enter ADMIN_KEY" required />
      <button className="rounded bg-blue-600 px-4 py-2 text-white" type="submit">Unlock admin update workflow</button>
    </form>
    <div className="rounded border bg-white p-4 text-sm">
      <p>Workflow:</p>
      <ol className="list-decimal pl-5">
        <li>Prepare CSV/JSON with required fields and source citation URLs.</li>
        <li>Run <code>npm run import:csv -- ./path.csv</code> to validate and import.</li>
        <li>Review AdminImportLog for stats and fix failed rows.</li>
      </ol>
    </div>
  </div>;
}
