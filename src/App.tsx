import { useMemo, useState } from 'react'
import './App.css'
import { starterWorkflows, statuses, type Workflow } from './data/workflows'
import { calculateWorkflowImpact, formatCurrency, scoreAutomationReadiness } from './lib/calculations'

type EditableNumber = 'manualMinutes' | 'automatedMinutes' | 'volumePerMonth' | 'hourlyRate' | 'setupCost' | 'monthlyToolCost'

function App() {
  const [workflows, setWorkflows] = useState<Workflow[]>(starterWorkflows)
  const [selectedId, setSelectedId] = useState(starterWorkflows[0].id)
  const selected = workflows.find((workflow) => workflow.id === selectedId) ?? workflows[0]

  const portfolio = useMemo(() => {
    const impacts = workflows.map(calculateWorkflowImpact)
    return impacts.reduce(
      (acc, impact) => ({
        hoursSaved: acc.hoursSaved + impact.hoursSaved,
        netSavings: acc.netSavings + impact.netSavings,
        annualNetSavings: acc.annualNetSavings + impact.annualNetSavings,
      }),
      { hoursSaved: 0, netSavings: 0, annualNetSavings: 0 },
    )
  }, [workflows])

  const selectedImpact = calculateWorkflowImpact(selected)
  const readiness = scoreAutomationReadiness(selected)

  function updateSelected<K extends keyof Workflow>(key: K, value: Workflow[K]) {
    setWorkflows((current) => current.map((workflow) => (workflow.id === selected.id ? { ...workflow, [key]: value } : workflow)))
  }

  function updateNumber(key: EditableNumber, value: string) {
    updateSelected(key, Number(value) as Workflow[typeof key])
  }

  function addWorkflow() {
    const id = `workflow-${crypto.randomUUID().slice(0, 8)}`
    const newWorkflow: Workflow = {
      id,
      name: 'New workflow idea',
      owner: 'Owner',
      status: 'Discover',
      painPoint: 'Describe the repetitive bottleneck.',
      aiAssist: 'Describe how AI or automation helps.',
      manualMinutes: 10,
      automatedMinutes: 2,
      volumePerMonth: 50,
      hourlyRate: 25,
      setupCost: 400,
      monthlyToolCost: 50,
    }
    setWorkflows((current) => [newWorkflow, ...current])
    setSelectedId(id)
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">WorkflowPulse • AI automation ROI planner</p>
          <h1>Turn messy business workflows into a quantified automation roadmap.</h1>
          <p className="hero-copy">
            A résumé-ready React + TypeScript app for mapping workflow pain points, estimating ROI, and prioritizing AI automation projects.
          </p>
          <div className="actions">
            <button type="button" onClick={addWorkflow}>Add workflow</button>
            <a href="#roadmap">View roadmap</a>
          </div>
        </div>
        <div className="score-card">
          <span>Portfolio annual impact</span>
          <strong>{formatCurrency(portfolio.annualNetSavings)}</strong>
          <p>{portfolio.hoursSaved.toFixed(1)} hours saved monthly across {workflows.length} workflows</p>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Portfolio metrics">
        <Metric label="Monthly net savings" value={formatCurrency(portfolio.netSavings)} />
        <Metric label="Monthly hours saved" value={portfolio.hoursSaved.toFixed(1)} />
        <Metric label="Selected readiness" value={`${readiness}/100`} />
        <Metric label="Selected payback" value={selectedImpact.paybackMonths === Infinity ? 'No payback' : `${selectedImpact.paybackMonths} mo`} />
      </section>

      <section className="workspace">
        <aside className="workflow-list" aria-label="Workflow list">
          <div className="section-heading">
            <p className="eyebrow">Pipeline</p>
            <h2>Workflow ideas</h2>
          </div>
          {workflows.map((workflow) => {
            const impact = calculateWorkflowImpact(workflow)
            return (
              <button
                className={workflow.id === selected.id ? 'workflow-card active' : 'workflow-card'}
                key={workflow.id}
                onClick={() => setSelectedId(workflow.id)}
                type="button"
              >
                <span>{workflow.status}</span>
                <strong>{workflow.name}</strong>
                <small>{formatCurrency(impact.annualNetSavings)} annual net</small>
              </button>
            )
          })}
        </aside>

        <section className="editor" aria-label="Workflow editor">
          <div className="section-heading">
            <p className="eyebrow">Selected workflow</p>
            <input className="title-input" value={selected.name} onChange={(event) => updateSelected('name', event.target.value)} />
          </div>

          <div className="form-grid">
            <label>
              Owner
              <input value={selected.owner} onChange={(event) => updateSelected('owner', event.target.value)} />
            </label>
            <label>
              Stage
              <select value={selected.status} onChange={(event) => updateSelected('status', event.target.value as Workflow['status'])}>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <label className="wide">
              Pain point
              <textarea value={selected.painPoint} onChange={(event) => updateSelected('painPoint', event.target.value)} />
            </label>
            <label className="wide">
              AI assist
              <textarea value={selected.aiAssist} onChange={(event) => updateSelected('aiAssist', event.target.value)} />
            </label>
          </div>

          <div className="calculator">
            <NumberField label="Manual minutes/run" value={selected.manualMinutes} onChange={(value) => updateNumber('manualMinutes', value)} />
            <NumberField label="Automated minutes/run" value={selected.automatedMinutes} onChange={(value) => updateNumber('automatedMinutes', value)} />
            <NumberField label="Monthly volume" value={selected.volumePerMonth} onChange={(value) => updateNumber('volumePerMonth', value)} />
            <NumberField label="Hourly rate" value={selected.hourlyRate} onChange={(value) => updateNumber('hourlyRate', value)} />
            <NumberField label="Setup cost" value={selected.setupCost} onChange={(value) => updateNumber('setupCost', value)} />
            <NumberField label="Monthly tool cost" value={selected.monthlyToolCost} onChange={(value) => updateNumber('monthlyToolCost', value)} />
          </div>
        </section>

        <aside className="insights" aria-label="Automation insights">
          <div className="section-heading">
            <p className="eyebrow">Impact snapshot</p>
            <h2>{selectedImpact.efficiencyGain}% faster</h2>
          </div>
          <Metric label="Monthly hours saved" value={selectedImpact.hoursSaved.toFixed(1)} />
          <Metric label="Monthly net savings" value={formatCurrency(selectedImpact.netSavings)} />
          <Metric label="Annual net savings" value={formatCurrency(selectedImpact.annualNetSavings)} />
          <div className="readiness">
            <span>Automation readiness</span>
            <div><i style={{ width: `${readiness}%` }} /></div>
            <strong>{readiness}/100</strong>
          </div>
        </aside>
      </section>

      <section className="roadmap" id="roadmap">
        <div className="section-heading">
          <p className="eyebrow">Roadmap</p>
          <h2>Prioritize by stage</h2>
        </div>
        <div className="kanban">
          {statuses.map((status) => (
            <div className="lane" key={status}>
              <h3>{status}</h3>
              {workflows.filter((workflow) => workflow.status === status).map((workflow) => (
                <article key={workflow.id}>
                  <strong>{workflow.name}</strong>
                  <p>{workflow.aiAssist}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: string) => void }) {
  return <label><span>{label}</span><input min="0" type="number" value={value} onChange={(event) => onChange(event.target.value)} /></label>
}

export default App
