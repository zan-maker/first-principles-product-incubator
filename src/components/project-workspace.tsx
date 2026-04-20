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
import { Badge } from '@/components/ui/badge'
import { PhaseStepper } from '@/components/phase-stepper'
import { ProblemStatementPhase } from '@/components/phases/problem-statement-phase'
import { FirstPrinciplesPhase } from '@/components/phases/first-principles-phase'
import { DesignThinkingPhase } from '@/components/phases/design-thinking-phase'
import { TOCPhase } from '@/components/phases/toc-phase'
import { LeanStartupPhase } from '@/components/phases/lean-startup-phase'
import { AIChatPanel } from '@/components/ai-chat-panel'
import { useAppStore } from '@/lib/store'
import {
  Target,
  Brain,
  Heart,
  AlertTriangle,
  Rocket,
  MessageSquare,
  ArrowLeft,
  LayoutDashboard,
  Sparkles,
  Loader2,
} from 'lucide-react'

const PHASES = [
  { id: 'problem_statement', label: 'Problem Statement', description: 'Define the initiating tension', icon: Target },
  { id: 'first_principles', label: 'First Principles', description: 'Decompose to fundamentals', icon: Brain },
  { id: 'design_thinking', label: 'Design Thinking', description: 'Empathize and ideate', icon: Heart },
  { id: 'theory_of_constraints', label: 'Constraints', description: 'Identify bottlenecks', icon: AlertTriangle },
  { id: 'lean_startup', label: 'Lean Startup', description: 'Validate with MVPs', icon: Rocket },
]

export function ProjectWorkspace() {
  const currentProjectId = useAppStore((s) => s.currentProjectId)
  const projects = useAppStore((s) => s.projects)
  const setCurrentView = useAppStore((s) => s.setCurrentView)
  const currentProject = projects.find((p) => p.id === currentProjectId) || null
  const [currentPhase, setCurrentPhase] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Initialize phases if not exist
  useEffect(() => {
    if (!currentProjectId) return

    const initPhases = async () => {
      const project = useAppStore.getState().getCurrentProject()
      if (!project) return

      const existingPhases = project.phases || []
      const missingPhases = PHASES.filter(
        (p) => !existingPhases.some((ep) => ep.phase === p.id)
      )

      for (const phase of missingPhases) {
        await fetch(`/api/projects/${currentProjectId}/phases`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phase: phase.id,
            status: 'not_started',
            data: null,
          }),
        })
      }

      // Reload projects
      try {
        const res = await fetch('/api/projects')
        const updatedProjects = await res.json()
        useAppStore.getState().setProjects(updatedProjects)
      } catch (e) {
        console.error(e)
      }

      setLoading(false)
    }

    initPhases()
  }, [currentProjectId])

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-3">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading project...</p>
        </div>
      </div>
    )
  }

  const completedPhases = (currentProject.phases || [])
    .map((p) => PHASES.findIndex((ph) => ph.id === p.phase))
    .filter((idx) => idx >= 0 && currentProject.phases[idx]?.status === 'completed')

  const currentPhaseId = currentProject.phases?.[currentPhase]?.id || ''

  const frameworkMap: Record<string, string> = {
    problem_statement: 'problem_statement',
    first_principles: 'first_principles',
    design_thinking: 'design_thinking',
    theory_of_constraints: 'theory_of_constraints',
    lean_startup: 'lean_startup',
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setCurrentView('dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{currentProject.name}</h1>
              {currentProject.description && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {currentProject.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setChatOpen(true)}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            AI Assistant
          </Button>
        </div>
      </motion.div>

      {/* Phase Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <PhaseStepper
          phases={PHASES.map((p) => ({
            id: p.id,
            label: p.label,
            description: p.description,
          }))}
          currentPhase={currentPhase}
          onPhaseChange={setCurrentPhase}
          completedPhases={completedPhases}
        />
      </motion.div>

      {/* Phase Content */}
      <motion.div
        key={currentPhase}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {currentPhase === 0 && currentPhaseId && (
          <ProblemStatementPhase
            projectId={currentProjectId!}
            phaseId={currentPhaseId}
          />
        )}
        {currentPhase === 1 && currentPhaseId && (
          <FirstPrinciplesPhase
            projectId={currentProjectId!}
            phaseId={currentPhaseId}
          />
        )}
        {currentPhase === 2 && currentPhaseId && (
          <DesignThinkingPhase
            projectId={currentProjectId!}
            phaseId={currentPhaseId}
          />
        )}
        {currentPhase === 3 && currentPhaseId && (
          <TOCPhase
            projectId={currentProjectId!}
            phaseId={currentPhaseId}
          />
        )}
        {currentPhase === 4 && currentPhaseId && (
          <LeanStartupPhase
            projectId={currentProjectId!}
            phaseId={currentPhaseId}
          />
        )}
      </motion.div>

      {/* AI Chat Panel */}
      <AIChatPanel
        framework={frameworkMap[PHASES[currentPhase].id] || 'general'}
        phase={PHASES[currentPhase].label}
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
      />
    </div>
  )
}
