import { describe, expect, it } from "vitest";
import { calcUas } from "@/lib/rp/calculator";

describe("calcUas", () => {
  it("3 H2 + GP only", () => {
    const r = calcUas({ h2:[{name:"Math",grade:"A"},{name:"Phy",grade:"B"},{name:"Chem",grade:"C"}], gp:"B" });
    expect(r.coreUas).toBe(20+17.5+15+8.75);
    expect(r.bestUas).toBe(r.coreUas);
  });

  it("4 H2 rebasing can improve", () => {
    const r = calcUas({ h2:[{name:"Math",grade:"A"},{name:"Phy",grade:"A"},{name:"Chem",grade:"A"},{name:"Econs",grade:"A"}], gp:"A" });
    expect(r.bestUas).toBeGreaterThanOrEqual(r.coreUas);
  });

  it("MTL included only if improves", () => {
    const r = calcUas({ h2:[{name:"Math",grade:"A"},{name:"Phy",grade:"A"},{name:"Chem",grade:"A"}], gp:"A", mtl:"U" });
    expect(r.bestUas).toBe(r.coreUas);
  });

  it("4th and MTL both", () => {
    const r = calcUas({ h2:[{name:"Math",grade:"A"},{name:"Phy",grade:"B"},{name:"Chem",grade:"C"},{name:"Econs",grade:"B"}], gp:"B", mtl:"A" });
    expect(r.bestUas).toBeGreaterThan(0);
  });
});
