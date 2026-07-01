import { describe, expect, it } from 'vitest'
import { calculateWorkflowImpact, scoreAutomationReadiness } from './calculations'

describe('calculateWorkflowImpact', () => {
  it('calculates monthly and annual savings for an automation workflow', () => {
    const result = calculateWorkflowImpact({
      manualMinutes: 18,
      automatedMinutes: 3,
      volumePerMonth: 90,
      hourlyRate: 28,
      setupCost: 650,
      monthlyToolCost: 79,
    })

    expect(result.hoursSaved).toBe(22.5)
    expect(result.grossSavings).toBe(630)
    expect(result.netSavings).toBe(551)
    expect(result.paybackMonths).toBe(1.18)
    expect(result.annualNetSavings).toBe(5962)
    expect(result.efficiencyGain).toBe(83.33)
  })

  it('does not produce negative saved time when automation is slower', () => {
    const result = calculateWorkflowImpact({
      manualMinutes: 5,
      automatedMinutes: 10,
      volumePerMonth: 20,
      hourlyRate: 25,
      setupCost: 100,
      monthlyToolCost: 10,
    })

    expect(result.hoursSaved).toBe(0)
    expect(result.netSavings).toBe(-10)
    expect(result.paybackMonths).toBe(Infinity)
  })
})

describe('scoreAutomationReadiness', () => {
  it('returns a readiness score between 0 and 100', () => {
    const score = scoreAutomationReadiness({
      manualMinutes: 15,
      automatedMinutes: 2,
      volumePerMonth: 100,
      hourlyRate: 30,
      setupCost: 500,
      monthlyToolCost: 50,
    })

    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(100)
  })
})
