export type WorkflowMetric = {
  manualMinutes: number
  automatedMinutes: number
  volumePerMonth: number
  hourlyRate: number
  setupCost: number
  monthlyToolCost: number
}

export type WorkflowResult = {
  hoursSaved: number
  grossSavings: number
  netSavings: number
  paybackMonths: number
  annualNetSavings: number
  efficiencyGain: number
}

export function calculateWorkflowImpact(metric: WorkflowMetric): WorkflowResult {
  const minutesSavedPerRun = Math.max(metric.manualMinutes - metric.automatedMinutes, 0)
  const hoursSaved = (minutesSavedPerRun * metric.volumePerMonth) / 60
  const grossSavings = hoursSaved * metric.hourlyRate
  const netSavings = grossSavings - metric.monthlyToolCost
  const paybackMonths = netSavings > 0 ? metric.setupCost / netSavings : Infinity
  const annualNetSavings = netSavings * 12 - metric.setupCost
  const efficiencyGain = metric.manualMinutes > 0 ? minutesSavedPerRun / metric.manualMinutes : 0

  return {
    hoursSaved: round(hoursSaved),
    grossSavings: round(grossSavings),
    netSavings: round(netSavings),
    paybackMonths: Number.isFinite(paybackMonths) ? round(paybackMonths) : Infinity,
    annualNetSavings: round(annualNetSavings),
    efficiencyGain: round(efficiencyGain * 100),
  }
}

export function scoreAutomationReadiness(metric: WorkflowMetric): number {
  const timeWaste = Math.min(metric.manualMinutes / 60, 1)
  const repeatability = Math.min(metric.volumePerMonth / 250, 1)
  const savingsRatio = metric.monthlyToolCost === 0 ? 1 : Math.min((metric.hourlyRate * metric.volumePerMonth) / metric.monthlyToolCost / 50, 1)
  return Math.round((timeWaste * 0.4 + repeatability * 0.4 + savingsRatio * 0.2) * 100)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}
