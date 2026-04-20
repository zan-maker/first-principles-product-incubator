'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Brain,
  Zap,
  Filter,
  ArrowRight,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Lightbulb,
  TestTube,
} from 'lucide-react'

interface FirstPrinciplesData {
  problemStatement: string
  systemMastery: {
    observations: string[]
    relationships: string[]
    nonObviousInsights: string[]
    understandingLevel: number
  }
  fireHoseAudit: Array<{
    item: string
    important: boolean | null
    impactful: boolean | null
    irreversible: boolean | null
    priority: string
    decision: string
  }>
  decomposition: {
    facts: string[]
    assumptions: string[]
    nextSteps: string[]
    highestLeverageAssumption: string
    testMethod: string
    testTimeline: string
    successCriteria: string
  }
}

const DEFAULT_DATA: FirstPrinciplesData = {
  problemStatement: '',
  systemMastery: {
    observations: [''],
    relationships: [''],
    nonObviousInsights: [''],
    understandingLevel: 3,
  },
  fireHoseAudit: [{ item: '', important: null, impactful: null, irreversible: null, priority: '', decision: '' }],
  decomposition: {
    facts: [''],
    assumptions: [''],
    nextSteps: [''],
    highestLeverageAssumption: '',
    testMethod: '',
    testTimeline: '',
    successCriteria: '',
  },
}

export function FirstPrinciplesPhase({ projectId, phaseId }: { projectId: string; phaseId: string }) {
  const projects = useAppStore((s) => s.projects)
  const currentProjectId = useAppStore((s) => s.currentProjectId)
  const currentProject = projects.find((p) => p.id === currentProjectId) || null
  const [activeTab, setActiveTab] = useState('system')
  const [data, setData] = useState<FirstPrinciplesData>(
    currentProject?.phases?.find((p) => p.phase === 'first_principles')?.data
      ? JSON.parse(
          (currentProject!.phases.find((p) => p.phase === 'first_principles')?.data as string) || '{}'
        )
      : DEFAULT_DATA
  )
  const [saving, setSaving] = useState(false)

  const updateField = (field: string, value: unknown) => {
    const keys = field.split('.')
    const updated = JSON.parse(JSON.stringify(data))
    let target: Record<string, unknown> = updated
    for (let i = 0; i < keys.length - 1; i++) {
      target = target[keys[i]] as Record<string, unknown>
    }
    target[keys[keys.length - 1]] = value
    setData(updated)
    autoSave(updated)
  }

  const autoSave = async (updatedData: FirstPrinciplesData) => {
    setSaving(true)
    try {
      await fetch(`/api/projects/${projectId}/phases/${phaseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'in_progress', data: updatedData }),
      })
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const addItem = (field: string, defaultItem: Record<string, unknown> = {}) => {
    const arr = (data as Record<string, unknown>)[field] as unknown[]
    updateField(field, [...arr, defaultItem])
  }

  const removeItem = (field: string, index: number) => {
    const arr = (data as Record<string, unknown>)[field] as unknown[]
    updateField(field, arr.filter((_, i) => i !== index))
  }

  const updateArrayItem = (field: string, index: number, key: string, value: unknown) => {
    const arr = JSON.parse(JSON.stringify((data as Record<string, unknown>)[field]))
    if (typeof arr[index] === 'object') {
      arr[index][key] = value
    } else {
      arr[index] = value
    }
    updateField(field, arr)
  }

  const completePhase = async () => {
    await autoSave(data)
    await fetch(`/api/projects/${projectId}/phases/${phaseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed', data }),
    })
  }

  const get3iPriority = (item: { important: boolean | null; impactful: boolean | null; irreversible: boolean | null }) => {
    if (item.important && item.impactful && item.irreversible) return 'CRITICAL'
    if (item.important && item.impactful) return 'HIGH'
    if (item.important && item.irreversible) return 'MEDIUM'
    if (item.important) return 'LOW'
    return 'DECLINE'
  }

  const principles = [
    { id: 'system', label: 'Master the System', icon: Brain, desc: 'Understand deeply before acting' },
    { id: 'firehose', label: 'Fire Hose Test', icon: Filter, desc: 'Apply the 3I prioritization model' },
    { id: 'decompose', label: 'First Principles', icon: Zap, desc: 'Decompose to fundamentals' },
  ]

  const priorityColors: Record<string, string> = {
    CRITICAL: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    HIGH: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    MEDIUM: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    LOW: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    DECLINE: 'bg-gray-100 text-gray-500 dark:bg-gray-900/30 dark:text-gray-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Brain className="w-4 h-4 text-emerald-500" />
          </div>
          MIT First Principles Decomposition
        </h2>
        <p className="text-muted-foreground mt-1">
          Break down complex problems to fundamental truths. Master the system, filter through the 3I model, and decompose assumptions to discover breakthrough opportunities.
        </p>
      </div>

      {/* Problem Statement Input */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Problem Statement</CardTitle>
          <CardDescription>State the complex problem in 1-3 clear sentences.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What is the core problem or challenge you're decomposing?"
            value={data.problemStatement}
            onChange={(e) => updateField('problemStatement', e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Principle Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {principles.map((p, idx) => (
          <div key={p.id} className="flex items-center">
            <button
              onClick={() => setActiveTab(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === p.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <p.icon className="w-3 h-3" />
              {p.label}
            </button>
            {idx < principles.length - 1 && (
              <ArrowRight className="w-3 h-3 text-muted-foreground mx-1 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Principle 1: Master the System */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-emerald-500" />
                Master the System
              </CardTitle>
              <CardDescription>
                Act like a hacker, not a hammer. Develop deep understanding before acting. If you&apos;re forcing solutions, you haven&apos;t understood deeply enough.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Understanding Level */}
              <div className="space-y-2">
                <Label>System Understanding Level</Label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateField('systemMastery.understandingLevel', level)}
                      className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                        data.systemMastery.understandingLevel >= level
                          ? 'bg-emerald-500 text-white'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Rate your understanding: Can you explain how it works to a novice? Can you predict what happens if X changes?
                </p>
              </div>

              {/* Observations */}
              <DynamicList
                title="Key Observations"
                description="What does the system actually do? (Not what it should do)"
                items={data.systemMastery.observations}
                onAdd={() => {
                  const obs = [...data.systemMastery.observations, '']
                  updateField('systemMastery.observations', obs)
                }}
                onRemove={(i) => updateField('systemMastery.observations', data.systemMastery.observations.filter((_, idx) => idx !== i))}
                onUpdate={(i, v) => {
                  const obs = [...data.systemMastery.observations]
                  obs[i] = v
                  updateField('systemMastery.observations', obs)
                }}
                icon="OBSERVE"
                color="bg-emerald-500"
              />

              {/* Relationships */}
              <DynamicList
                title="Key Relationships"
                description="Map the key components and their relationships"
                items={data.systemMastery.relationships}
                onAdd={() => updateField('systemMastery.relationships', [...data.systemMastery.relationships, ''])}
                onRemove={(i) => updateField('systemMastery.relationships', data.systemMastery.relationships.filter((_, idx) => idx !== i))}
                onUpdate={(i, v) => {
                  const rel = [...data.systemMastery.relationships]
                  rel[i] = v
                  updateField('systemMastery.relationships', rel)
                }}
                icon="MAP"
                color="bg-blue-500"
              />

              {/* Non-Obvious Insights */}
              <DynamicList
                title="Non-Obvious Insights"
                description="What have you found that others might miss?"
                items={data.systemMastery.nonObviousInsights}
                onAdd={() => updateField('systemMastery.nonObviousInsights', [...data.systemMastery.nonObviousInsights, ''])}
                onRemove={(i) => updateField('systemMastery.nonObviousInsights', data.systemMastery.nonObviousInsights.filter((_, idx) => idx !== i))}
                onUpdate={(i, v) => {
                  const ins = [...data.systemMastery.nonObviousInsights]
                  ins[i] = v
                  updateField('systemMastery.nonObviousInsights', ins)
                }}
                icon="INSIGHT"
                color="bg-amber-500"
              />

              {/* Mastery Checklist */}
              <div className="p-4 rounded-xl bg-muted/50 border">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Mastery Checklist</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    'Can I explain how it works to a novice?',
                    'Can I predict what will happen if X changes?',
                    'Do I understand WHY it was built this way?',
                    'Have I found at least one non-obvious insight?',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Circle className="w-4 h-4 text-muted-foreground/40" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Principle 2: Fire Hose Test */}
        <TabsContent value="firehose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-500" />
                Pass the Fire Hose Test (3I Model)
              </CardTitle>
              <CardDescription>
                It&apos;s mathematically impossible to do everything well. Apply three filters: Is it Important? Impactful? Irreversible?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 3I Decision Matrix */}
              <div className="p-4 rounded-xl bg-muted/50 border">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">3I Decision Matrix</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                    <span className="font-bold text-red-700 dark:text-red-400">Critical:</span> All 3 Yes
                  </div>
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <span className="font-bold text-amber-700 dark:text-amber-400">High:</span> Important + Impactful
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <span className="font-bold text-blue-700 dark:text-blue-400">Medium:</span> Important + Irreversible
                  </div>
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900/30">
                    <span className="font-bold text-gray-600 dark:text-gray-400">Low:</span> Important only
                  </div>
                </div>
              </div>

              {/* Audit Items */}
              <div className="space-y-3">
                {data.fireHoseAudit.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl border space-y-3">
                    <div className="flex items-start gap-2">
                      <Input
                        placeholder="Task, project, or initiative..."
                        value={item.item}
                        onChange={(e) => updateArrayItem('fireHoseAudit', idx, 'item', e.target.value)}
                        className="font-medium"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => removeItem('fireHoseAudit', idx)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(['important', 'impactful', 'irreversible'] as const).map((criteria) => (
                        <button
                          key={criteria}
                          onClick={() => {
                            const current = item[criteria]
                            updateArrayItem('fireHoseAudit', idx, criteria, current === null ? true : current === true ? false : null)
                          }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
                            item[criteria] === true
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                              : item[criteria] === false
                              ? 'border-red-400 bg-red-500/10 text-red-600 dark:text-red-400'
                              : 'border-border text-muted-foreground hover:bg-accent'
                          }`}
                        >
                          {item[criteria] === true ? '✓' : item[criteria] === false ? '✗' : '○'}{' '}
                          {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
                        </button>
                      ))}
                      <Badge className={priorityColors[get3iPriority(item)] || ''}>
                        {get3iPriority(item)}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addItem('fireHoseAudit', { item: '', important: null, impactful: null, irreversible: null, priority: '', decision: '' })} className="gap-1">
                  <Plus className="w-3 h-3" /> Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Principle 3: First Principles Decomposition */}
        <TabsContent value="decompose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Think Like a Founder
              </CardTitle>
              <CardDescription>
                Question assumptions, rebuild from fundamentals. Instead of &quot;How do I solve this?&quot;, ask &quot;What do I truly know? What am I assuming?&quot;
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Three-Column Analysis */}
              <div>
                <p className="text-sm font-semibold mb-3">Three-Column Decomposition</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <Label className="text-emerald-700 dark:text-emerald-400">Facts (What I KNOW)</Label>
                    </div>
                    {data.decomposition.facts.map((fact, idx) => (
                      <div key={idx} className="flex gap-1">
                        <Input
                          placeholder="Verified truth..."
                          value={fact}
                          onChange={(e) => {
                            const facts = [...data.decomposition.facts]
                            facts[idx] = e.target.value
                            updateField('decomposition.facts', facts)
                          }}
                          className="text-sm"
                        />
                        <Button variant="ghost" size="icon" className="shrink-0 w-8 h-8" onClick={() => updateField('decomposition.facts', data.decomposition.facts.filter((_, i) => i !== idx))}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" onClick={() => updateField('decomposition.facts', [...data.decomposition.facts, ''])} className="gap-1">
                      <Plus className="w-3 h-3" /> Add Fact
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <Label className="text-amber-700 dark:text-amber-400">Assumptions (What I BELIEVE)</Label>
                    </div>
                    {data.decomposition.assumptions.map((assumption, idx) => (
                      <div key={idx} className="flex gap-1">
                        <Input
                          placeholder="Belief to question..."
                          value={assumption}
                          onChange={(e) => {
                            const assumptions = [...data.decomposition.assumptions]
                            assumptions[idx] = e.target.value
                            updateField('decomposition.assumptions', assumptions)
                          }}
                          className="text-sm"
                        />
                        <Button variant="ghost" size="icon" className="shrink-0 w-8 h-8" onClick={() => updateField('decomposition.assumptions', data.decomposition.assumptions.filter((_, i) => i !== idx))}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" onClick={() => updateField('decomposition.assumptions', [...data.decomposition.assumptions, ''])} className="gap-1">
                      <Plus className="w-3 h-3" /> Add Assumption
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <Label className="text-blue-700 dark:text-blue-400">Next Steps (What to TEST)</Label>
                    </div>
                    {data.decomposition.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-1">
                        <Input
                          placeholder="Test to run..."
                          value={step}
                          onChange={(e) => {
                            const steps = [...data.decomposition.nextSteps]
                            steps[idx] = e.target.value
                            updateField('decomposition.nextSteps', steps)
                          }}
                          className="text-sm"
                        />
                        <Button variant="ghost" size="icon" className="shrink-0 w-8 h-8" onClick={() => updateField('decomposition.nextSteps', data.decomposition.nextSteps.filter((_, i) => i !== idx))}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" onClick={() => updateField('decomposition.nextSteps', [...data.decomposition.nextSteps, ''])} className="gap-1">
                      <Plus className="w-3 h-3" /> Add Test
                    </Button>
                  </div>
                </div>
              </div>

              {/* Test Design */}
              <div className="p-4 rounded-xl border bg-muted/30">
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-primary" />
                  This Week&apos;s Test
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Highest-Leverage Assumption</Label>
                    <Input
                      placeholder="The one assumption that, if wrong, changes everything..."
                      value={data.decomposition.highestLeverageAssumption}
                      onChange={(e) => updateField('decomposition.highestLeverageAssumption', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Test Method</Label>
                    <Input
                      placeholder="How will you test this assumption?"
                      value={data.decomposition.testMethod}
                      onChange={(e) => updateField('decomposition.testMethod', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Timeline</Label>
                    <Input
                      placeholder="By when?"
                      value={data.decomposition.testTimeline}
                      onChange={(e) => updateField('decomposition.testTimeline', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Success Criteria</Label>
                    <Input
                      placeholder="How will you know the answer?"
                      value={data.decomposition.successCriteria}
                      onChange={(e) => updateField('decomposition.successCriteria', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-xs text-muted-foreground">
          {saving && <span>Saving...</span>}
        </div>
        <div className="flex gap-2">
          {principles.findIndex((p) => p.id === activeTab) > 0 && (
            <Button variant="outline" onClick={() => setActiveTab(principles[principles.findIndex((p) => p.id === activeTab) - 1].id)}>
              Previous
            </Button>
          )}
          {principles.findIndex((p) => p.id === activeTab) < principles.length - 1 && (
            <Button onClick={() => setActiveTab(principles[principles.findIndex((p) => p.id === activeTab) + 1].id)}>
              Next Principle
            </Button>
          )}
          {principles.findIndex((p) => p.id === activeTab) === principles.length - 1 && (
            <Button onClick={completePhase}>Complete Phase</Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function DynamicList({
  title,
  description,
  items,
  onAdd,
  onRemove,
  onUpdate,
  icon,
  color,
}: {
  title: string
  description: string
  items: string[]
  onAdd: () => void
  onRemove: (idx: number) => void
  onUpdate: (idx: number, value: string) => void
  icon: string
  color: string
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        {title}
      </Label>
      <p className="text-xs text-muted-foreground">{description}</p>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-1">
          <Input
            placeholder={`Enter ${title.toLowerCase()}...`}
            value={item}
            onChange={(e) => onUpdate(idx, e.target.value)}
            className="text-sm"
          />
          <Button variant="ghost" size="icon" className="shrink-0 w-8 h-8" onClick={() => onRemove(idx)}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={onAdd} className="gap-1">
        <Plus className="w-3 h-3" /> Add {title}
      </Button>
    </div>
  )
}


