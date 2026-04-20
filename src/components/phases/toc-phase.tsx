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
  AlertTriangle,
  Target,
  Zap,
  RefreshCw,
  Link2,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface TOCData {
  systemDescription: string
  constraint: string
  constraintEvidence: string[]
  fiveFocusingSteps: {
    identify: string
    exploit: string
    subordinate: string
    elevate: string
    repeat: string
  }
  currentRealityTree: Array<{
    undesirableEffect: string
    causes: string[]
    depth: number
  }>
  evaporatingCloud: {
    conflictA: string
    conflictB: string
    commonObjective: string
    assumptionA: string
    assumptionB: string
    injection: string
  }
  bufferManagement: {
    bufferName: string
    bufferSize: string
    bufferStatus: string
    warningSignals: string[]
  }
}

const DEFAULT_DATA: TOCData = {
  systemDescription: '',
  constraint: '',
  constraintEvidence: [''],
  fiveFocusingSteps: {
    identify: '',
    exploit: '',
    subordinate: '',
    elevate: '',
    repeat: '',
  },
  currentRealityTree: [{ undesirableEffect: '', causes: [''], depth: 1 }],
  evaporatingCloud: {
    conflictA: '',
    conflictB: '',
    commonObjective: '',
    assumptionA: '',
    assumptionB: '',
    injection: '',
  },
  bufferManagement: {
    bufferName: '',
    bufferSize: '',
    bufferStatus: 'not_started',
    warningSignals: [''],
  },
}

export function TOCPhase({ projectId, phaseId }: { projectId: string; phaseId: string }) {
  const projects = useAppStore((s) => s.projects)
  const currentProjectId = useAppStore((s) => s.currentProjectId)
  const currentProject = projects.find((p) => p.id === currentProjectId) || null
  const [activeTab, setActiveTab] = useState('identify')
  const [data, setData] = useState<TOCData>(
    currentProject?.phases?.find((p) => p.phase === 'theory_of_constraints')?.data
      ? JSON.parse(
          (currentProject!.phases.find((p) => p.phase === 'theory_of_constraints')?.data as string) || '{}'
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

  const autoSave = async (updatedData: TOCData) => {
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

  const tocSteps = [
    { id: 'identify', label: 'Identify', icon: AlertTriangle, desc: 'Find the constraint' },
    { id: 'exploit', label: 'Exploit', icon: Zap, desc: 'Maximize constraint output' },
    { id: 'subordinate', label: 'Subordinate', icon: Link2, desc: 'Align everything else' },
    { id: 'elevate', label: 'Elevate', icon: TrendingUp, desc: 'Break the constraint' },
    { id: 'repeat', label: 'Repeat', icon: RefreshCw, desc: 'Find next constraint' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </div>
          Theory of Constraints
        </h2>
        <p className="text-muted-foreground mt-1">
          Identify the primary bottleneck in your system, apply the Five Focusing Steps, and optimize throughput. Every complex system has at least one constraint — find it, and improvement becomes focused and powerful.
        </p>
      </div>

      {/* System Context */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">System Description</CardTitle>
          <CardDescription>Describe the system or process you&apos;re analyzing for constraints.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What system, process, or value chain are you analyzing? What are the key steps from input to output?"
            value={data.systemDescription}
            onChange={(e) => updateField('systemDescription', e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Focusing Steps */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {tocSteps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setActiveTab(step.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === step.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <step.icon className="w-3 h-3" />
              {step.label}
            </button>
            {idx < tocSteps.length - 1 && (
              <ArrowRight className="w-3 h-3 text-muted-foreground mx-1 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Identify */}
      {activeTab === 'identify' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Step 1: Identify the Constraint
              </CardTitle>
              <CardDescription>
                What is the single biggest bottleneck limiting your system&apos;s throughput? The constraint is where the system is weakest — it determines the maximum output of the entire system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Identified Constraint</Label>
                <Input
                  placeholder="What is the primary bottleneck? e.g., User onboarding takes 7 days due to manual verification..."
                  value={data.constraint}
                  onChange={(e) => updateField('constraint', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Evidence</Label>
                <p className="text-xs text-muted-foreground">What data or observations support this identification?</p>
                {data.constraintEvidence.map((evidence, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Input
                      placeholder="Evidence or data point..."
                      value={evidence}
                      onChange={(e) => {
                        const updated = [...data.constraintEvidence]
                        updated[idx] = e.target.value
                        updateField('constraintEvidence', updated)
                      }}
                      className="text-sm"
                    />
                    <Button variant="ghost" size="icon" className="shrink-0 w-7 h-7" onClick={() => updateField('constraintEvidence', data.constraintEvidence.filter((_, i) => i !== idx))}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={() => updateField('constraintEvidence', [...data.constraintEvidence, ''])} className="gap-1 text-xs">
                  <Plus className="w-3 h-3" /> Add Evidence
                </Button>
              </div>

              {/* Current Reality Tree */}
              <div className="p-4 rounded-xl border bg-muted/30">
                <p className="text-sm font-semibold mb-2">Current Reality Tree</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Map the undesirable effects (UDEs) and trace them back through causes to the root constraint.
                </p>
                {data.currentRealityTree.map((node, idx) => (
                  <div key={idx} className="flex items-start gap-2 mb-3">
                    <div className="w-6 h-6 rounded bg-orange-500/10 flex items-center justify-center text-xs font-bold text-orange-500 shrink-0 mt-1">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Input
                        placeholder="Undesirable effect..."
                        value={node.undesirableEffect}
                        onChange={(e) => {
                          const updated = [...data.currentRealityTree]
                          updated[idx] = { ...updated[idx], undesirableEffect: e.target.value }
                          updateField('currentRealityTree', updated)
                        }}
                        className="text-sm"
                      />
                      {node.causes.map((cause, cIdx) => (
                        <div key={cIdx} className="flex gap-1 ml-4">
                          <Input
                            placeholder="Cause..."
                            value={cause}
                            onChange={(e) => {
                              const updated = [...data.currentRealityTree]
                              updated[idx].causes[cIdx] = e.target.value
                              updateField('currentRealityTree', updated)
                            }}
                            className="text-xs"
                          />
                          <Button variant="ghost" size="icon" className="shrink-0 w-6 h-6" onClick={() => {
                            const updated = [...data.currentRealityTree]
                            updated[idx].causes = updated[idx].causes.filter((_, i) => i !== cIdx)
                            updateField('currentRealityTree', updated)
                          }}>
                            <Trash2 className="w-2.5 h-2.5" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="ml-4 text-xs gap-1" onClick={() => {
                        const updated = [...data.currentRealityTree]
                        updated[idx].causes = [...updated[idx].causes, '']
                        updateField('currentRealityTree', updated)
                      }}>
                        <Plus className="w-2.5 h-2.5" /> Cause
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 w-7 h-7" onClick={() => updateField('currentRealityTree', data.currentRealityTree.filter((_, i) => i !== idx))}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateField('currentRealityTree', [...data.currentRealityTree, { undesirableEffect: '', causes: [''], depth: 1 }])} className="gap-1 text-xs">
                  <Plus className="w-3 h-3" /> Add UDE
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Exploit */}
      {activeTab === 'exploit' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Step 2: Exploit the Constraint
            </CardTitle>
            <CardDescription>
              How can you get the maximum output from the constraint without additional investment? Look for ways to reduce waste, optimize scheduling, and ensure the constraint is never idle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="How can you maximize the constraint's output? What waste can be eliminated? How can you ensure the constraint is always working at full capacity?"
              value={data.fiveFocusingSteps.exploit}
              onChange={(e) => updateField('fiveFocusingSteps.exploit', e.target.value)}
              rows={6}
            />
          </CardContent>
        </Card>
      )}

      {/* Step 3: Subordinate */}
      {activeTab === 'subordinate' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Link2 className="w-5 h-5 text-blue-500" />
              Step 3: Subordinate Everything Else
            </CardTitle>
            <CardDescription>
              Align all non-constraint resources to support the constraint. Other parts of the system should not produce more than the constraint can handle — overproduction creates waste.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="How should other parts of the system adapt to support the constraint? What changes in policies, procedures, or behaviors are needed?"
              value={data.fiveFocusingSteps.subordinate}
              onChange={(e) => updateField('fiveFocusingSteps.subordinate', e.target.value)}
              rows={6}
            />
          </CardContent>
        </Card>
      )}

      {/* Step 4: Elevate */}
      {activeTab === 'elevate' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Step 4: Elevate the Constraint
              </CardTitle>
              <CardDescription>
                If the constraint still limits performance after exploitation and subordination, invest to increase its capacity. This may require significant changes or investment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What investments or changes are needed to increase the constraint's capacity? What would break the current limitation?"
                value={data.fiveFocusingSteps.elevate}
                onChange={(e) => updateField('fiveFocusingSteps.elevate', e.target.value)}
                rows={6}
              />
            </CardContent>
          </Card>

          {/* Evaporating Cloud */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Conflict Resolution (Evaporating Cloud)</CardTitle>
              <CardDescription>
                Surface and challenge the assumptions behind the constraint.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">Common Objective</Label>
                  <Input
                    placeholder="What do both sides want?"
                    value={data.evaporatingCloud.commonObjective}
                    onChange={(e) => updateField('evaporatingCloud.commonObjective', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Injection (Breakthrough Idea)</Label>
                  <Input
                    placeholder="What new idea breaks the conflict?"
                    value={data.evaporatingCloud.injection}
                    onChange={(e) => updateField('evaporatingCloud.injection', e.target.value)}
                    className="border-primary/40"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Requirement A (One side)</Label>
                  <Input
                    placeholder="What one side needs..."
                    value={data.evaporatingCloud.conflictA}
                    onChange={(e) => updateField('evaporatingCloud.conflictA', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Requirement B (Other side)</Label>
                  <Input
                    placeholder="What other side needs..."
                    value={data.evaporatingCloud.conflictB}
                    onChange={(e) => updateField('evaporatingCloud.conflictB', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Assumption behind A</Label>
                  <Input
                    placeholder="Why do they think they need A?"
                    value={data.evaporatingCloud.assumptionA}
                    onChange={(e) => updateField('evaporatingCloud.assumptionA', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Assumption behind B</Label>
                  <Input
                    placeholder="Why do they think they need B?"
                    value={data.evaporatingCloud.assumptionB}
                    onChange={(e) => updateField('evaporatingCloud.assumptionB', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 5: Repeat */}
      {activeTab === 'repeat' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-purple-500" />
              Step 5: Repeat
            </CardTitle>
            <CardDescription>
              Once you&apos;ve broken the current constraint, a new one will emerge. The cycle of ongoing improvement never ends — find the new constraint and repeat.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What might the next constraint be once this one is resolved? What's your plan for ongoing improvement?"
              value={data.fiveFocusingSteps.repeat}
              onChange={(e) => updateField('fiveFocusingSteps.repeat', e.target.value)}
              rows={4}
            />

            {/* Buffer Management */}
            <div className="p-4 rounded-xl border bg-muted/30">
              <p className="text-sm font-semibold mb-3">Buffer Management</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">Buffer Name</Label>
                  <Input
                    placeholder="What are you protecting against?"
                    value={data.bufferManagement.bufferName}
                    onChange={(e) => updateField('bufferManagement.bufferName', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Buffer Size</Label>
                  <Input
                    placeholder="e.g., 20% capacity, 2 week lead time..."
                    value={data.bufferManagement.bufferSize}
                    onChange={(e) => updateField('bufferManagement.bufferSize', e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Label className="text-xs">Warning Signals</Label>
                {data.bufferManagement.warningSignals.map((signal, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Input
                      placeholder="Early warning indicator..."
                      value={signal}
                      onChange={(e) => {
                        const updated = [...data.bufferManagement.warningSignals]
                        updated[idx] = e.target.value
                        updateField('bufferManagement.warningSignals', updated)
                      }}
                      className="text-xs"
                    />
                    <Button variant="ghost" size="icon" className="shrink-0 w-7 h-7" onClick={() => updateField('bufferManagement.warningSignals', data.bufferManagement.warningSignals.filter((_, i) => i !== idx))}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={() => updateField('bufferManagement.warningSignals', [...data.bufferManagement.warningSignals, ''])} className="gap-1 text-xs">
                  <Plus className="w-3 h-3" /> Add Signal
                </Button>
              </div>
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
          {tocSteps.findIndex((s) => s.id === activeTab) > 0 && (
            <Button variant="outline" onClick={() => setActiveTab(tocSteps[tocSteps.findIndex((s) => s.id === activeTab) - 1].id)}>
              Previous
            </Button>
          )}
          {tocSteps.findIndex((s) => s.id === activeTab) < tocSteps.length - 1 && (
            <Button onClick={() => setActiveTab(tocSteps[tocSteps.findIndex((s) => s.id === activeTab) + 1].id)}>
              Next Step
            </Button>
          )}
          {tocSteps.findIndex((s) => s.id === activeTab) === tocSteps.length - 1 && (
            <Button onClick={completePhase}>Complete Phase</Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
