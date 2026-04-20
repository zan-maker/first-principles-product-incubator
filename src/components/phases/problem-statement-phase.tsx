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
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Target,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Lightbulb,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface ProblemStatementData {
  entryPoint: string
  observableTension: string
  rootCauses: string[]
  consequences: {
    strategic: string
    cultural: string
    financial: string
  }
  strategicConnection: string
  finalStatement: string
}

const ENTRY_POINTS = [
  { id: 'problem', label: 'Problem', icon: AlertTriangle, description: 'Something broken or misaligned that needs resolution', color: 'text-red-500' },
  { id: 'opportunity', label: 'Opportunity', icon: TrendingUp, description: 'Something emerging that invites capture', color: 'text-emerald-500' },
  { id: 'situation', label: 'Situation', icon: Target, description: 'A change demanding strategic interpretation', color: 'text-amber-500' },
]

const DEFAULT_DATA: ProblemStatementData = {
  entryPoint: '',
  observableTension: '',
  rootCauses: [''],
  consequences: { strategic: '', cultural: '', financial: '' },
  strategicConnection: '',
  finalStatement: '',
}

export function ProblemStatementPhase({ projectId, phaseId }: { projectId: string; phaseId: string }) {
  const { currentProject, updatePhaseData } = useAppStore()
  const [activeTab, setActiveTab] = useState('entry')
  const [data, setData] = useState<ProblemStatementData>(
    currentProject?.phases?.find((p) => p.phase === 'problem_statement')?.data
      ? JSON.parse(
          (currentProject!.phases.find((p) => p.phase === 'problem_statement')?.data as string) || '{}'
        )
      : DEFAULT_DATA
  )
  const [saving, setSaving] = useState(false)
  const [whys, setWhys] = useState<string[]>([''])

  const updateField = (field: keyof ProblemStatementData, value: unknown) => {
    const updated = { ...data, [field]: value }
    setData(updated)
    autoSave(updated)
  }

  const autoSave = async (updatedData: ProblemStatementData) => {
    setSaving(true)
    try {
      await fetch(`/api/projects/${projectId}/phases/${phaseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'in_progress',
          data: updatedData,
        }),
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

  const steps = [
    { id: 'entry', label: 'Entry Point', icon: Target },
    { id: 'tension', label: 'Observable Tension', icon: AlertTriangle },
    { id: 'rootcause', label: '5 Whys Analysis', icon: ChevronRight },
    { id: 'consequences', label: 'Consequences', icon: TrendingUp },
    { id: 'statement', label: 'Final Statement', icon: Lightbulb },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === activeTab)
  const canAdvance = () => {
    switch (activeTab) {
      case 'entry': return !!data.entryPoint
      case 'tension': return !!data.observableTension
      case 'rootcause': return whys.filter(Boolean).length >= 3
      case 'consequences': return !!(data.consequences.strategic || data.consequences.cultural || data.consequences.financial)
      default: return true
    }
  }

  const generateStatement = () => {
    const entryLabel = ENTRY_POINTS.find(e => e.id === data.entryPoint)?.label || 'Situation'
    const lastWhy = whys.filter(Boolean).pop() || 'an underlying structural issue'
    const stmt = `**${entryLabel} Statement**\n\n${data.observableTension}\n\nRoot cause analysis reveals that beneath the surface symptoms lies ${lastWhy.toLowerCase()}. \n\n**Consequences of inaction:**\n- Strategic: ${data.consequences.strategic || 'To be defined'}\n- Cultural: ${data.consequences.cultural || 'To be defined'}\n- Financial: ${data.consequences.financial || 'To be defined'}\n\n**Strategic context:** ${data.strategicConnection || 'To be defined'}`
    updateField('finalStatement', stmt)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-500" />
          </div>
          Problem & Opportunity Framing
        </h2>
        <p className="text-muted-foreground mt-1">
          Define the initiating tension that anchors your innovation project. Identify whether you&apos;re facing a problem, opportunity, or situation that demands action.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setActiveTab(step.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === step.id
                  ? 'bg-primary text-primary-foreground'
                  : idx < currentStepIndex
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <step.icon className="w-3 h-3" />
              {step.label}
            </button>
            {idx < steps.length - 1 && (
              <ArrowRight className="w-3 h-3 text-muted-foreground mx-1 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="entry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Your Entry Point</CardTitle>
              <CardDescription>
                Identify the type of initiating moment driving this project.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              {ENTRY_POINTS.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => updateField('entryPoint', ep.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                    data.entryPoint === ep.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <ep.icon className={`w-6 h-6 mb-2 ${data.entryPoint === ep.id ? 'text-primary' : ep.color}`} />
                  <h4 className="font-semibold text-sm">{ep.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{ep.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tension" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Observable Tension</CardTitle>
              <CardDescription>
                What specific event, data point, or observation triggered the need to address this? Focus on facts, not assumptions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="What happened or is happening that makes action necessary? What specific, observable facts indicate something needs addressing?"
                value={data.observableTension}
                onChange={(e) => updateField('observableTension', e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">Tip: Use specific events and data</Badge>
                <Badge variant="outline" className="text-xs">Focus on what you can observe</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rootcause" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5 Whys Root Cause Analysis</CardTitle>
              <CardDescription>
                Systematically dig deeper into the root cause by asking &quot;Why?&quot; for each answer. Continue until you reach a structural cause.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {whys.map((why, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-1">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    {idx === 0 ? (
                      <p className="text-sm text-muted-foreground mb-1">
                        Surface symptom: <span className="font-medium text-foreground">{data.observableTension?.slice(0, 80) || '...'}</span>
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-1">
                        Why does <span className="italic">&quot;{whys[idx - 1]?.slice(0, 60)}...&quot;</span> happen?
                      </p>
                    )}
                    <Input
                      placeholder={idx === 0 ? "Why is this happening?" : "And what causes that?"}
                      value={why}
                      onChange={(e) => {
                        const updated = [...whys]
                        updated[idx] = e.target.value
                        setWhys(updated)
                        if (idx === whys.length - 1 && e.target.value) {
                          setWhys([...updated, ''])
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">
                Try to reach at least 3-5 levels deep. The goal is to find the structural cause, not just symptoms.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consequences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consequences of Inaction</CardTitle>
              <CardDescription>
                Make the cost of not addressing this visible and tangible. What happens if nothing changes?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-500" />
                    Strategic Cost
                  </Label>
                  <Textarea
                    placeholder="Missed opportunities, competitive disadvantage..."
                    value={data.consequences.strategic}
                    onChange={(e) =>
                      updateField('consequences', { ...data.consequences, strategic: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    Cultural Cost
                  </Label>
                  <Textarea
                    placeholder="Morale, alignment, trust impact..."
                    value={data.consequences.cultural}
                    onChange={(e) =>
                      updateField('consequences', { ...data.consequences, cultural: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    Financial Cost
                  </Label>
                  <Textarea
                    placeholder="Revenue loss, increased expenses..."
                    value={data.consequences.financial}
                    onChange={(e) =>
                      updateField('consequences', { ...data.consequences, financial: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-primary" />
                  Strategic Connection
                </Label>
                <Textarea
                  placeholder="How does this connect to your organization's mission or broader strategic priorities? Why does this matter beyond the immediate context?"
                  value={data.strategicConnection}
                  onChange={(e) => updateField('strategicConnection', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Final Statement</CardTitle>
              <CardDescription>
                Synthesize your analysis into a clear, compelling statement that anchors your innovation project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={generateStatement} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Auto-Generate Statement
              </Button>
              <Textarea
                placeholder="Your synthesized problem/opportunity statement..."
                value={data.finalStatement}
                onChange={(e) => updateField('finalStatement', e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-xs text-muted-foreground">
          {saving && <span className="flex items-center gap-1">Saving...</span>}
        </div>
        <div className="flex gap-2">
          {currentStepIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => setActiveTab(steps[currentStepIndex - 1].id)}
            >
              Previous
            </Button>
          )}
          {currentStepIndex < steps.length - 1 && (
            <Button
              onClick={() => setActiveTab(steps[currentStepIndex + 1].id)}
              disabled={!canAdvance()}
            >
              Next Step
            </Button>
          )}
          {currentStepIndex === steps.length - 1 && (
            <Button onClick={completePhase} disabled={!data.finalStatement}>
              Complete Phase
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
