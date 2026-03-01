import { describe, expect, it } from "vitest";
import { chanceLabel, eligibilityTier } from "@/lib/reco/engine";

describe("chance labels", () => {
  it("high boundary", ()=> expect(chanceLabel(85, 80, 85, true)).toBe("High"));
  it("medium boundary", ()=> expect(chanceLabel(80, 80, 85, true)).toBe("Medium"));
  it("prereq not met always low", ()=> expect(chanceLabel(90, 80, 85, false)).toBe("Low"));
});

describe("eligibility tier", () => {
  it("tier 1", ()=> expect(eligibilityTier("met", "Medium", false, false)).toBe(1));
  it("tier 2", ()=> expect(eligibilityTier("met", "Low", true, false)).toBe(2));
  it("tier 5", ()=> expect(eligibilityTier("not_met", "Low", true, true)).toBe(5));
});
