import type { WorkflowMetric } from '../lib/calculations'

export type Workflow = WorkflowMetric & {
  id: string
  name: string
  owner: string
  status: 'Discover' | 'Design' | 'Automate' | 'Measure'
  painPoint: string
  aiAssist: string
}

export const starterWorkflows: Workflow[] = [
  {
    id: 'missed-call-followup',
    name: 'Missed-call follow-up',
    owner: 'Front desk',
    status: 'Automate',
    painPoint: 'Leads call after hours and never get a callback.',
    aiAssist: 'AI drafts SMS replies, logs call details, and creates a next-day task.',
    manualMinutes: 18,
    automatedMinutes: 3,
    volumePerMonth: 90,
    hourlyRate: 28,
    setupCost: 650,
    monthlyToolCost: 79,
  },
  {
    id: 'invoice-chaser',
    name: 'Invoice payment chaser',
    owner: 'Operations',
    status: 'Measure',
    painPoint: 'Late invoices require repeated manual reminders.',
    aiAssist: 'Workflow sends polite reminders and escalates only risky accounts.',
    manualMinutes: 12,
    automatedMinutes: 2,
    volumePerMonth: 160,
    hourlyRate: 32,
    setupCost: 500,
    monthlyToolCost: 49,
  },
  {
    id: 'review-request',
    name: 'Customer review request',
    owner: 'Service team',
    status: 'Design',
    painPoint: 'Happy customers are not consistently asked for reviews.',
    aiAssist: 'After job completion, AI personalizes a review request and tracks outcomes.',
    manualMinutes: 7,
    automatedMinutes: 1,
    volumePerMonth: 140,
    hourlyRate: 24,
    setupCost: 300,
    monthlyToolCost: 39,
  },
]

export const statuses: Workflow['status'][] = ['Discover', 'Design', 'Automate', 'Measure']
