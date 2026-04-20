'use client'

import { useState } from 'react'
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
import {
  ArrowRight,
  Plus,
  Trash2,
  Rocket,
  Target,
  BarChart3,
  RefreshCw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Zap,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface LeanStartupData {
  hypotheses: Array<{
    id: string
    belief: string
    hypothesis: string
    experimentType: string
    mvpDescription: string
    metric: string
    targetValue: string
    timeframe: string
    status: 'not_started' | 'running' | 'validated' | 'invalidated' | 'inconclusive'
    results: string
    learnings: string
    nextAction: string
  }>
  buildMeasureLearn: {
    build: string
    measure: string
    learn: string
  }
  mvpDefinition: {
    coreAssumption: string
    minimumFeatures: string[]
    successCriteria: string
    targetUsers: string
    distributionChannel: string
  }
}

const EXPERIMENT_TYPES = [
  'Landing Page Test',
  'Concierge MVP',
  'Wizard of Oz',
  'Smoke Test',
  'Pre-sale / Crowdfunding',
  'A/B Test',
  'Prototype Test',
  'Survey / Interview',
  'Fake Door Test',
  'Piecemeal MVP',
]

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; bgColor: string }> = {
  not_started: { icon: HelpCircle, color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-900/30' },
  running: { icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  validated: { icon: CheckCircle2, color: 'text-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  invalidated: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' },
  inconclusive: { icon: HelpCircle, color: 'text-amber-500', bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
}

const DEFAULT_DATA: LeanStartupData = {
  hypotheses: [{
    id: '1',
    belief: '',
    hypothesis: '',
    experimentType: '',
    mvpDescription: '',
    metric: '',
    targetValue: '',
    timeframe: '',
    status: 'not_started',
    results: '',
    learnings: '',
    nextAction: '',
  }],
  buildMeasureLearn: {
    build: '',
    measure: '',
    learn: '',
  },
  mvpDefinition: {
    coreAssumption: '',
    minimumFeatures: [''],
    successCriteria: '',
    targetUsers: '',
    distributionChannel: '',
  },
}

export function LeanStartupPhase({ projectId, phaseId }: { projectId: string; phaseId: string }) {
  const projects = useAppStore((s) => s.projects)
  const currentProjectId = useAppStore((s) => s.currentProjectId)
  const currentProject = projects.find((p) => p.id === currentProjectId) || null
  const [activeTab, setActiveTab] = useState('hypotheses')
  const [data, setData] = useState<LeanStartupData>(
    currentProject?.phases?.find((p) => p.phase === 'lean_startup')?.data
      ? JSON.parse(
          (currentProject!.phases.find((p) => p.phase === 'lean_startup')?.data as string) || '{}'
        )
      : DEFAULT_DATA
  )
  const [expandedHypothesis, setExpandedHypothesis] = useState<string | null>('1')
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

  const autoSave = async (updatedData: LeanStartupData) => {
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

  const completePhase = async () => {
    await autoSave(data)
    await fetch(`/api/projects/${projectId}/phases/${phaseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed', data }),
    })
  }

  const addHypothesis = () => {
    const newId = String(Date.now())
    updateField('hypotheses', [...data.hypotheses, {
      id: newId,
      belief: '',
      hypothesis: '',
      experimentType: '',
      mvpDescription: '',
      metric: '',
      targetValue: '',
      timeframe: '',
      status: 'not_started',
      results: '',
      learnings: '',
      nextAction: '',
    }])
    setExpandedHypothesis(newId)
  }

  const updateHypothesis = (id: string, field: string, value: unknown) => {
    const updated = data.hypotheses.map((h) => h.id === id ? { ...h, [field]: value } : h)
    updateField('hypotheses', updated)
  }

  const lsTabs = [
    { id: 'hypotheses', label: 'Hypotheses', icon: Target },
    { id: 'mvp', label: 'MVP Definition', icon: Rocket },
    { id: 'bml', label: 'Build-Measure-Learn', icon: RefreshCw },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Rocket className="w-4 h-4 text-blue-500" />
          </div>
          Lean Startup Evaluation
        </h2>
        <p className="text-muted-foreground mt-1">
          Design minimum viable experiments to validate your riskiest assumptions. Move through Build-Measure-Learn loops quickly, and make evidence-based decisions about your product direction.
        </p>
      </div>

      {/* Validation Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl border bg-emerald-50 dark:bg-emerald-950/20 text-center">
          <p className="text-2xl font-bold text-emerald-600">
            {data.hypotheses.filter((h) => h.status === 'validated').length}
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">Validated</p>
        </div>
        <div className="p-3 rounded-xl border bg-red-50 dark:bg-red-950/20 text-center">
          <p className="text-2xl font-bold text-red-600">
            {data.hypotheses.filter((h) => h.status === 'invalidated').length}
          </p>
          <p className="text-xs text-red-700 dark:text-red-400">Invalidated</p>
        </div>
        <div className="p-3 rounded-xl border bg-blue-50 dark:bg-blue-950/20 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data.hypotheses.filter((h) => h.status === 'running').length}
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-400">In Progress</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {lsTabs.map((tab, idx) => (
          <div key={tab.id} className="flex items-center">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
            {idx < lsTabs.length - 1 && (
              <ArrowRight className="w-3 h-3 text-muted-foreground mx-1 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Hypotheses Tab */}
      {activeTab === 'hypotheses' && (
        <div className="space-y-3">
          {data.hypotheses.map((hypothesis) => {
            const statusConfig = STATUS_CONFIG[hypothesis.status]
            const StatusIcon = statusConfig.icon
            const isExpanded = expandedHypothesis === hypothesis.id

            return (
              <Card key={hypothesis.id} className="overflow-hidden">
                <button
                  className="w-full p-4 text-left flex items-center gap-3 hover:bg-accent/50 transition-colors"
                  onClick={() => setExpandedHypothesis(isExpanded ? null : hypothesis.id)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${statusConfig.bgColor}`}>
                    <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {hypothesis.hypothesis || 'New hypothesis...'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {hypothesis.belief || 'Define your belief and hypothesis'}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {hypothesis.experimentType || 'No experiment type'}
                  </Badge>
                  <ArrowRight className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {isExpanded && (
                  <CardContent className="pt-0 pb-4 px-4 space-y-4 border-t">
                    <div className="grid gap-4 sm:grid-cols-2 pt-4">
                      <div className="space-y-1">
                        <Label className="text-xs">Core Belief</Label>
                        <Textarea
                          placeholder="We believe that [user segment] has [need]..."
                          value={hypothesis.belief}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'belief', e.target.value)}
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Testable Hypothesis</Label>
                        <Textarea
                          placeholder="If we [action], then [metric] will [change] because [reason]..."
                          value={hypothesis.hypothesis}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'hypothesis', e.target.value)}
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Experiment Type</Label>
                        <div className="flex flex-wrap gap-1.5">
                          {EXPERIMENT_TYPES.map((type) => (
                            <button
                              key={type}
                              onClick={() => updateHypothesis(hypothesis.id, 'experimentType', type)}
                              className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all border ${
                                hypothesis.experimentType === type
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border text-muted-foreground hover:bg-accent'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">MVP Description</Label>
                        <Textarea
                          placeholder="Describe your minimum viable product/experiment..."
                          value={hypothesis.mvpDescription}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'mvpDescription', e.target.value)}
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Key Metric</Label>
                        <Input
                          placeholder="e.g., Conversion rate, signups..."
                          value={hypothesis.metric}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'metric', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Target Value</Label>
                        <Input
                          placeholder="e.g., > 5%, 100 signups..."
                          value={hypothesis.targetValue}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'targetValue', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Timeframe</Label>
                        <Input
                          placeholder="e.g., 2 weeks, 1 sprint..."
                          value={hypothesis.timeframe}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'timeframe', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Results</Label>
                        <Textarea
                          placeholder="What were the actual results?"
                          value={hypothesis.results}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'results', e.target.value)}
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Learnings</Label>
                        <Textarea
                          placeholder="What did you learn from this experiment?"
                          value={hypothesis.learnings}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'learnings', e.target.value)}
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Status</Label>
                        <div className="flex gap-2">
                          {(['not_started', 'running', 'validated', 'invalidated', 'inconclusive'] as const).map((status) => {
                            const cfg = STATUS_CONFIG[status]
                            return (
                              <button
                                key={status}
                                onClick={() => updateHypothesis(hypothesis.id, 'status', status)}
                                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium transition-all border ${
                                  hypothesis.status === status
                                    ? `border-current ${cfg.bgColor} ${cfg.color}`
                                    : 'border-border text-muted-foreground hover:bg-accent'
                                }`}
                              >
                                <cfg.icon className="w-3 h-3" />
                                {status.replace('_', ' ')}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Next Action</Label>
                        <Input
                          placeholder="What will you do next based on results?"
                          value={hypothesis.nextAction}
                          onChange={(e) => updateHypothesis(hypothesis.id, 'nextAction', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}

          <Button variant="outline" onClick={addHypothesis} className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Add Hypothesis
          </Button>
        </div>
      )}

      {/* MVP Definition Tab */}
      {activeTab === 'mvp' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-500" />
              MVP Definition
            </CardTitle>
            <CardDescription>
              Define the minimum set of features needed to test your riskiest assumption. Remember: the MVP is for learning, not for shipping.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Core Assumption to Test</Label>
              <Input
                placeholder="What is the single most important assumption that must be true for your product to succeed?"
                value={data.mvpDefinition.coreAssumption}
                onChange={(e) => updateField('mvpDefinition.coreAssumption', e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-semibold">Target Users</Label>
                <Input
                  placeholder="Who is this MVP for specifically?"
                  value={data.mvpDefinition.targetUsers}
                  onChange={(e) => updateField('mvpDefinition.targetUsers', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-semibold">Distribution Channel</Label>
                <Input
                  placeholder="How will users find/access this MVP?"
                  value={data.mvpDefinition.distributionChannel}
                  onChange={(e) => updateField('mvpDefinition.distributionChannel', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Minimum Features</Label>
              <p className="text-xs text-muted-foreground">Only include features absolutely needed to test the core assumption.</p>
              {data.mvpDefinition.minimumFeatures.map((feature, idx) => (
                <div key={idx} className="flex gap-1">
                  <Input
                    placeholder={`Feature ${idx + 1}...`}
                    value={feature}
                    onChange={(e) => {
                      const features = [...data.mvpDefinition.minimumFeatures]
                      features[idx] = e.target.value
                      updateField('mvpDefinition.minimumFeatures', features)
                    }}
                    className="text-sm"
                  />
                  <Button variant="ghost" size="icon" className="shrink-0 w-7 h-7" onClick={() => updateField('mvpDefinition.minimumFeatures', data.mvpDefinition.minimumFeatures.filter((_, i) => i !== idx))}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => updateField('mvpDefinition.minimumFeatures', [...data.mvpDefinition.minimumFeatures, ''])} className="gap-1 text-xs">
                <Plus className="w-3 h-3" /> Add Feature
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Success Criteria</Label>
              <Textarea
                placeholder="What specific outcomes would make this MVP successful? What evidence would confirm your assumption?"
                value={data.mvpDefinition.successCriteria}
                onChange={(e) => updateField('mvpDefinition.successCriteria', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Build-Measure-Learn Tab */}
      {activeTab === 'bml' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-purple-500" />
              Build-Measure-Learn Loop
            </CardTitle>
            <CardDescription>
              Document your build-measure-learn feedback loop. The goal is to minimize total time through this loop.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <Label className="text-blue-700 dark:text-blue-400 font-semibold text-sm">BUILD</Label>
                </div>
                <Textarea
                  placeholder="What are you building? What's the simplest thing that could test your assumption?"
                  value={data.buildMeasureLearn.build}
                  onChange={(e) => updateField('buildMeasureLearn.build', e.target.value)}
                  rows={4}
                  className="text-sm bg-transparent border-0 focus-visible:ring-0 p-0"
                />
              </div>

              <div className="p-4 rounded-xl border bg-amber-50 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-white" />
                  </div>
                  <Label className="text-amber-700 dark:text-amber-400 font-semibold text-sm">MEASURE</Label>
                </div>
                <Textarea
                  placeholder="What metrics will you track? How will you collect data?"
                  value={data.buildMeasureLearn.measure}
                  onChange={(e) => updateField('buildMeasureLearn.measure', e.target.value)}
                  rows={4}
                  className="text-sm bg-transparent border-0 focus-visible:ring-0 p-0"
                />
              </div>

              <div className="p-4 rounded-xl border bg-emerald-50 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Lightbulb className="w-3 h-3 text-white" />
                  </div>
                  <Label className="text-emerald-700 dark:text-emerald-400 font-semibold text-sm">LEARN</Label>
                </div>
                <Textarea
                  placeholder="What did you learn? Did the data support or invalidate your hypothesis?"
                  value={data.buildMeasureLearn.learn}
                  onChange={(e) => updateField('buildMeasureLearn.learn', e.target.value)}
                  rows={4}
                  className="text-sm bg-transparent border-0 focus-visible:ring-0 p-0"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border text-center">
              <p className="text-xs text-muted-foreground">
                The goal is to minimize the total time through the Build-Measure-Learn feedback loop.
                Every iteration should produce validated learning that informs the next decision.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-xs text-muted-foreground">
          {saving && <span>Saving...</span>}
        </div>
        <div className="flex gap-2">
          {lsTabs.findIndex((t) => t.id === activeTab) > 0 && (
            <Button variant="outline" onClick={() => setActiveTab(lsTabs[lsTabs.findIndex((t) => t.id === activeTab) - 1].id)}>
              Previous
            </Button>
          )}
          {lsTabs.findIndex((t) => t.id === activeTab) < lsTabs.length - 1 && (
            <Button onClick={() => setActiveTab(lsTabs[lsTabs.findIndex((t) => t.id === activeTab) + 1].id)}>
              Next
            </Button>
          )}
          {lsTabs.findIndex((t) => t.id === activeTab) === lsTabs.length - 1 && (
            <Button onClick={completePhase}>Complete Phase</Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
