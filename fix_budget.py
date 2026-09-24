import re

path = "/Users/shumd2/Desktop/foldragonStudios/websites/ai/src/components/cost-calculator.tsx"
with open(path) as f:
    content = f.read()

# Replace the broken recommendations useMemo
old_recommendations = """  // Recommendations within budget
  const recommendations = useMemo(() => {
    if (!budgetMode) return [];
    const affordable = allModels
      .filter((m) => m.pricing?.input != null && m.pricing?.output != null && m.scores["aa-intelligence"] != null)
      .map((m) => {
        const p = m.pricing!;
        // Cost per task for a standard workload (10K input, 500 output, 70% cache)
        const cacheTok = 10000 * 0.7;
        const freshTok = 10000 - cacheTok;
        const costPerTask = (freshTok * (p.input ?? 0) + cacheTok * (p.cacheRead ?? p.input ?? 0) + 500 * (p.output ?? 0)) / 1_000_000;
        return { model: m, costPerTask, aa: m.scores["aa-intelligence"]! };
      })
      .sort((a, b) => b.aa / b.costPerTask - a.aa / a.costPerTask);
    return affordable.filter((r) => r.costPerTask <= budgetAmount / 1000); // budget per month, costPerTask per 13k tokens
  }, [allModels, budgetAmount, budgetMode]);"""

new_recommendations = """  // Complexity-defined token volumes
  const complexityTokens: Record<string, { input: number; output: number }> = {
    casual: { input: 300_000, output: 5_000 },
    standard: { input: 1_000_000, output: 10_000 },
    heavy: { input: 10_000_000, output: 50_000 },
    enterprise: { input: 50_000_000, output: 200_000 },
  };

  // Monthly cost per model for the selected complexity, ranked by intelligence
  const recommendations = useMemo(() => {
    if (!budgetMode) return [];
    const vol = complexityTokens[complexity] ?? complexityTokens.standard;
    const affordable = allModels
      .filter((m) => m.pricing?.input != null && m.pricing?.output != null && m.scores["aa-intelligence"] != null)
      .map((m) => {
        const p = m.pricing!;
        const cacheRate = p.cacheRead ?? p.input ?? 0;
        const cacheTok = vol.input * 0.7;
        const freshTok = vol.input - cacheTok;
        // Monthly cost = (fresh_input * input_rate + cached_input * cache_rate + output * output_rate) / 1M * 30
        const monthly = ((freshTok * (p.input ?? 0) + cacheTok * cacheRate + vol.output * (p.output ?? 0)) / 1_000_000) * 30;
        return { model: m, monthly, aa: m.scores["aa-intelligence"]! };
      })
      .sort((a, b) => {
        // First: fit within budget, then by AA descending
        const aInBudget = a.monthly <= budgetAmount;
        const bInBudget = b.monthly <= budgetAmount;
        if (aInBudget && !bInBudget) return -1;
        if (!aInBudget && bInBudget) return 1;
        return b.aa - a.aa;
      });
    return affordable;
  }, [allModels, budgetAmount, complexity, budgetMode]);"""

if old_recommendations in content:
    content = content.replace(old_recommendations, new_recommendations)
    print("Fixed recommendations")
else:
    print("OLD NOT FOUND")
    # Debug: find the old block
    idx = content.find("// Recommendations within budget")
    if idx >= 0:
        print(f"Found at index {idx}")
        print(repr(content[idx:idx+500]))

# Also fix the "Your budget covers" section to show actual recommendations count and which models fit
old_covers = """                <div className="mt-0.5 text-[11px] text-muted">
                  {complexity === "casual" && "~300K input tokens/day at $0.05/M"}
                  {complexity === "standard" && "~1M input tokens/day at $0.10/M"}
                  {complexity === "heavy" && "~10M input tokens/day at $0.20/M"}
                  {complexity === "enterprise" && "~100M+ input tokens/day"}
                </div>"""

new_covers = """                <div className="mt-0.5 text-[11px] text-muted">
                  {complexity === "casual" && "~300K input + 5K output/day"}
                  {complexity === "standard" && "~1M input + 10K output/day"}
                  {complexity === "heavy" && "~10M input + 50K output/day"}
                  {complexity === "enterprise" && "~50M input + 200K output/day"}
                </div>
                <div className="mt-2 text-[11px] text-accent">
                  {recommendations.filter((r) => r.monthly <= budgetAmount).length} models fit within budget
                </div>"""

if old_covers in content:
    content = content.replace(old_covers, new_covers)
    print("Fixed budget covers text")
else:
    print("covers NOT FOUND")

with open(path, 'w') as f:
    f.write(content)
print("DONE")
