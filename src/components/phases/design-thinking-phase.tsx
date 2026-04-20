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
import { ArrowRight, Plus, Trash2, Heart, Eye, Lightbulb, MessageCircle, Users, Target, PenTool, TestTube } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface DesignThinkingData {
  empathyMap: {
    thinkFeel: string[]
    hear: string[]
    see: string[]
    sayDo: string[]
    pains: string[]
    gains: string[]
  }
  personas: Array<{
    name: string
    age: string
    role: string
    quote: string
    goals: string[]
    frustrations: string[]
  }>
  povStatement: string
  hmwStatements: string[]
  selectedHmw: string
}

const DEFAULT_DATA: DesignThinkingData = {
  empathyMap: {
    thinkFeel: [''],
    hear: [''],
    see: [''],
    sayDo: [''],
    pains: [''],
    gains: [''],
  },
  personas: [{
    name: '',
    age: '',
    role: '',
    quote: '',
    goals: [''],
    frustrations: [''],
  }],
  povStatement: '',
  hmwStatements: [''],
  selectedHmw: '',
}

export function DesignThinkingPhase({ projectId, phaseId }: { projectId: string; phaseId: string }) {
  const { currentProject } = useAppStore()
  const [activeTab, setActiveTab] = useState('empathy')
  const [data, setData] = useState<DesignThinkingData>(
    currentProject?.phases?.find((p) => p.phase === 'design_thinking')?.data
      ? JSON.parse(
          (currentProject!.phases.find((p) => p.phase === 'design_thinking')?.data as string) || '{}'
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

  const autoSave = async (updatedData: DesignThinkingData) => {
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

  const updateEmpathyField = (field: keyof DesignThinkingData['empathyMap'], idx: number, value: string) => {
    const updated = [...data.empathyMap[field]]
    updated[idx] = value
    updateField(`empathyMap.${field}`, updated)
  }

  const addEmpathyField = (field: keyof DesignThinkingData['empathyMap']) => {
    updateField(`empathyMap.${field}`, [...data.empathyMap[field], ''])
  }

  const removeEmpathyField = (field: keyof DesignThinkingData['empathyMap'], idx: number) => {
    updateField(`empathyMap.${field}`, data.empathyMap[field].filter((_, i) => i !== idx))
  }

  const empathySections = [
    { key: 'thinkFeel' as const, label: 'Think & Feel', icon: Heart, color: 'text-rose-500', bgColor: 'bg-rose-500' },
    { key: 'hear' as const, label: 'Hear', icon: MessageCircle, color: 'text-blue-500', bgColor: 'bg-blue-500' },
    { key: 'see' as const, label: 'See', icon: Eye, color: 'text-emerald-500', bgColor: 'bg-emerald-500' },
    { key: 'sayDo' as const, label: 'Say & Do', icon: Users, color: 'text-amber-500', bgColor: 'bg-amber-500' },
    { key: 'pains' as const, label: 'Pains', icon: Target, color: 'text-red-500', bgColor: 'bg-red-500' },
    { key: 'gains' as const, label: 'Gains', icon: Lightbulb, color: 'text-emerald-500', bgColor: 'bg-emerald-500' },
  ]

  const dtPhases = [
    { id: 'empathy', label: 'Empathize', icon: Heart },
    { id: 'define', label: 'Define', icon: Target },
    { id: 'ideate', label: 'Ideate', icon: Lightbulb },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          Design Thinking Framework
        </h2>
        <p className="text-muted-foreground mt-1">
          Human-centered innovation methodology. Develop deep user empathy, synthesize insights into problem statements, and generate creative solutions through structured ideation.
        </p>
      </div>

      {/* Phase Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {dtPhases.map((phase, idx) => (
          <div key={phase.id} className="flex items-center">
            <button
              onClick={() => setActiveTab(phase.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === phase.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <phase.icon className="w-3 h-3" />
              {phase.label}
            </button>
            {idx < dtPhases.length - 1 && (
              <ArrowRight className="w-3 h-3 text-muted-foreground mx-1 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Empathize Phase */}
      {activeTab === 'empathy' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              Empathy Map
            </CardTitle>
            <CardDescription>
              Synthesize your user research into a visual understanding of your user&apos;s mindset. Fill in each quadrant with specific observations from your research.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {empathySections.map((section) => (
                <div key={section.key} className="p-4 rounded-xl border space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${section.bgColor}`} />
                    <Label className="flex items-center gap-1.5 text-sm">
                      <section.icon className={`w-3.5 h-3.5 ${section.color}`} />
                      {section.label}
                    </Label>
                  </div>
                  {data.empathyMap[section.key].map((item, idx) => (
                    <div key={idx} className="flex gap-1">
                      <Input
                        placeholder={`Enter ${section.label.toLowerCase()}...`}
                        value={item}
                        onChange={(e) => updateEmpathyField(section.key, idx, e.target.value)}
                        className="text-sm"
                      />
                      <Button variant="ghost" size="icon" className="shrink-0 w-7 h-7" onClick={() => removeEmpathyField(section.key, idx)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addEmpathyField(section.key)} className="gap-1 text-xs">
                    <Plus className="w-3 h-3" /> Add
                  </Button>
                </div>
              ))}
            </div>

            {/* Persona Development */}
            <div className="border-t pt-4">
              <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Persona Development
              </p>
              {data.personas.map((persona, pIdx) => (
                <div key={pIdx} className="p-4 rounded-xl border bg-muted/30 space-y-3 mb-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Name</Label>
                      <Input placeholder="Persona name..." value={persona.name} onChange={(e) => {
                        const updated = [...data.personas]
                        updated[pIdx] = { ...updated[pIdx], name: e.target.value }
                        updateField('personas', updated)
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Age / Role</Label>
                      <Input placeholder="Age, Occupation..." value={`${persona.age}${persona.role ? ', ' + persona.role : ''}`} onChange={(e) => {
                        const updated = [...data.personas]
                        updated[pIdx] = { ...updated[pIdx], age: '', role: e.target.value }
                        updateField('personas', updated)
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Quote</Label>
                      <Input placeholder="&quot;Verbatim quote...&quot;" value={persona.quote} onChange={(e) => {
                        const updated = [...data.personas]
                        updated[pIdx] = { ...updated[pIdx], quote: e.target.value }
                        updateField('personas', updated)
                      }} />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs text-emerald-600">Goals</Label>
                      {persona.goals.map((goal, gIdx) => (
                        <div key={gIdx} className="flex gap-1">
                          <Input placeholder="Goal..." value={goal} onChange={(e) => {
                            const updated = [...data.personas]
                            updated[pIdx].goals[gIdx] = e.target.value
                            updateField('personas', updated)
                          }} className="text-sm" />
                          <Button variant="ghost" size="icon" className="shrink-0 w-7 h-7" onClick={() => {
                            const updated = [...data.personas]
                            updated[pIdx].goals = updated[pIdx].goals.filter((_, i) => i !== gIdx)
                            updateField('personas', updated)
                          }}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => {
                        const updated = [...data.personas]
                        updated[pIdx].goals = [...updated[pIdx].goals, '']
                        updateField('personas', updated)
                      }}>
                        <Plus className="w-3 h-3" /> Add Goal
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-red-600">Frustrations</Label>
                      {persona.frustrations.map((frust, fIdx) => (
                        <div key={fIdx} className="flex gap-1">
                          <Input placeholder="Frustration..." value={frust} onChange={(e) => {
                            const updated = [...data.personas]
                            updated[pIdx].frustrations[fIdx] = e.target.value
                            updateField('personas', updated)
                          }} className="text-sm" />
                          <Button variant="ghost" size="icon" className="shrink-0 w-7 h-7" onClick={() => {
                            const updated = [...data.personas]
                            updated[pIdx].frustrations = updated[pIdx].frustrations.filter((_, i) => i !== fIdx)
                            updateField('personas', updated)
                          }}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => {
                        const updated = [...data.personas]
                        updated[pIdx].frustrations = [...updated[pIdx].frustrations, '']
                        updateField('personas', updated)
                      }}>
                        <Plus className="w-3 h-3" /> Add Frustration
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateField('personas', [...data.personas, { name: '', age: '', role: '', quote: '', goals: [''], frustrations: [''] }])} className="gap-1">
                <Plus className="w-3 h-3" /> Add Persona
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Define Phase */}
      {activeTab === 'define' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Define: POV &amp; How Might We
            </CardTitle>
            <CardDescription>
              Synthesize your empathy research into actionable problem statements and opportunity questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Point of View (POV) Statement</Label>
              <p className="text-xs text-muted-foreground">
                [USER] needs [NEED] because [INSIGHT]. The need should be a verb, not a solution. The insight should be surprising.
              </p>
              <Textarea
                placeholder="e.g., A busy working parent with two kids under 5 needs to coordinate family schedules efficiently because the mental load of remembering everyone's activities creates constant anxiety..."
                value={data.povStatement}
                onChange={(e) => updateField('povStatement', e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">How Might We (HMW) Statements</Label>
              <p className="text-xs text-muted-foreground">
                Reframe problems as opportunities. Generate multiple HMW statements from different angles.
              </p>
              {data.hmwStatements.map((hmw, idx) => (
                <div key={idx} className="flex gap-1">
                  <Input
                    placeholder={`HMW ${idx + 1}: e.g., HMW eliminate the mental load of schedule coordination?`}
                    value={hmw}
                    onChange={(e) => {
                      const updated = [...data.hmwStatements]
                      updated[idx] = e.target.value
                      updateField('hmwStatements', updated)
                    }}
                    className="text-sm"
                  />
                  <Button variant="ghost" size="icon" className="shrink-0 w-7 h-7" onClick={() => updateField('hmwStatements', data.hmwStatements.filter((_, i) => i !== idx))}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => updateField('hmwStatements', [...data.hmwStatements, ''])} className="gap-1">
                <Plus className="w-3 h-3" /> Add HMW Statement
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Selected HMW for Ideation</Label>
              <Input
                placeholder="Your primary How Might We statement..."
                value={data.selectedHmw}
                onChange={(e) => updateField('selectedHmw', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ideate Phase */}
      {activeTab === 'ideate' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Ideate: Rapid Solution Generation
            </CardTitle>
            <CardDescription>
              Generate a wide range of creative solutions without judgment. Focus on quantity first, then evaluate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 border">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Crazy 8s Framework</p>
              <p className="text-xs text-muted-foreground">
                Generate 8 ideas in 8 minutes. One minute per idea. No judgment, no erasing. Circle your top 2 when done.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={num} className="p-3 rounded-xl border hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-muted-foreground">Idea {num}</span>
                    <Badge variant="outline" className="text-[10px]">1 min</Badge>
                  </div>
                  <Textarea
                    placeholder={`Describe idea ${num}...`}
                    rows={3}
                    className="text-xs resize-none"
                  />
                </div>
              ))}
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
          {dtPhases.findIndex((p) => p.id === activeTab) > 0 && (
            <Button variant="outline" onClick={() => setActiveTab(dtPhases[dtPhases.findIndex((p) => p.id === activeTab) - 1].id)}>
              Previous
            </Button>
          )}
          {dtPhases.findIndex((p) => p.id === activeTab) < dtPhases.length - 1 && (
            <Button onClick={() => setActiveTab(dtPhases[dtPhases.findIndex((p) => p.id === activeTab) + 1].id)}>
              Next Phase
            </Button>
          )}
          {dtPhases.findIndex((p) => p.id === activeTab) === dtPhases.length - 1 && (
            <Button onClick={completePhase}>Complete Phase</Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
