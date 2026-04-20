'use client'

import { useEffect, useState } from 'react'
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
import {
  Sparkles,
  Target,
  Brain,
  Heart,
  AlertTriangle,
  Rocket,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  FolderKanban,
  Plus,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { NewProjectDialog } from '@/components/new-project-dialog'

const FRAMEWORKS = [
  {
    id: 'problem_statement',
    label: 'Problem & Opportunity Framing',
    description: 'Define the initiating tension. Identify whether you are facing a problem, opportunity, or situation that demands strategic action.',
    icon: Target,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    steps: ['Entry Point', 'Observable Tension', '5 Whys Analysis', 'Consequences', 'Final Statement'],
  },
  {
    id: 'first_principles',
    label: 'MIT First Principles',
    description: 'Break down complex problems to fundamental truths. Master the system, apply the 3I prioritization model, and decompose assumptions.',
    icon: Brain,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    steps: ['Master the System', 'Fire Hose Test', 'Think Like a Founder'],
  },
  {
    id: 'design_thinking',
    label: 'Design Thinking Framework',
    description: 'Human-centered innovation through empathy, ideation, and iteration. Develop deep user understanding and generate creative solutions.',
    icon: Heart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    steps: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'],
  },
  {
    id: 'theory_of_constraints',
    label: 'Theory of Constraints',
    description: 'Identify system bottlenecks using the Five Focusing Steps. Optimize throughput by finding and managing the primary constraint.',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    steps: ['Identify', 'Exploit', 'Subordinate', 'Elevate', 'Repeat'],
  },
  {
    id: 'lean_startup',
    label: 'Lean Startup Evaluation',
    description: 'Design MVP experiments to validate assumptions. Navigate Build-Measure-Learn loops and make evidence-based product decisions.',
    icon: Rocket,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    steps: ['Hypotheses', 'MVP Definition', 'Build-Measure-Learn'],
  },
]

export function DashboardView() {
  const { projects, setCurrentProjectId, setCurrentView } = useAppStore()

  const getPhaseProgress = (project: { phases: Array<{ phase: string; status: string }> }) => {
    const phaseStatuses = FRAMEWORKS.map((fw) => {
      const phase = project.phases.find((p) => p.phase === fw.id)
      if (!phase) return 'not_started'
      return phase.status
    })
    const completed = phaseStatuses.filter((s) => s === 'completed').length
    const inProgress = phaseStatuses.filter((s) => s === 'in_progress').length
    return { completed, inProgress, total: FRAMEWORKS.length }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <Badge variant="outline" className="text-xs">Innovation Workspace</Badge>
          </div>
          <h1 className="text-3xl font-bold mt-2">
            First-Principles <span className="gradient-text">Product Incubator</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            An innovation workspace that guides product, engineering, and design teams from ideation to validated MVP. 
            Leverage structured frameworks to break down problems, understand users, identify bottlenecks, and test assumptions systematically.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <NewProjectDialog />
            <Button variant="outline" className="gap-2">
              <Lightbulb className="w-4 h-4" />
              How It Works
            </Button>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2" />
      </motion.div>

      {/* Workflow Overview */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Framework Pipeline
        </h2>
        <div className="grid gap-4 lg:grid-cols-5">
          {FRAMEWORKS.map((fw, idx) => (
            <motion.div
              key={fw.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card className={`h-full border ${fw.borderColor} hover:shadow-md transition-shadow`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${fw.bgColor} flex items-center justify-center`}>
                      <fw.icon className={`w-4 h-4 ${fw.color}`} />
                    </div>
                    <Badge variant="outline" className="text-[10px] ml-auto">
                      Phase {idx + 1}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm mt-2">{fw.label}</CardTitle>
                  <CardDescription className="text-xs">{fw.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {fw.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${fw.color} opacity-60`} />
                        <span className="text-[11px] text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                  {idx < FRAMEWORKS.length - 1 && (
                    <div className="hidden lg:flex items-center justify-end mt-3 -mr-4">
                      <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-primary" />
            Your Projects
          </h2>
          <NewProjectDialog />
        </div>

        {projects.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <FolderKanban className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">No projects yet</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Create your first innovation project to get started.
              </p>
              <NewProjectDialog />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => {
              const progress = getPhaseProgress(project)
              const progressPercent = Math.round(
                ((progress.completed + progress.inProgress * 0.5) / progress.total) * 100
              )
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-md transition-all hover:border-primary/40"
                    onClick={() => {
                      setCurrentProjectId(project.id)
                      setCurrentView('workspace')
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <FolderKanban className="w-4 h-4 text-primary" />
                          <CardTitle className="text-sm">{project.name}</CardTitle>
                        </div>
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className="text-[10px]">
                          {project.status}
                        </Badge>
                      </div>
                      {project.description && (
                        <CardDescription className="text-xs line-clamp-2">
                          {project.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>{progress.completed}/{progress.total} phases completed</span>
                          <span>{progressPercent}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {FRAMEWORKS.map((fw) => {
                            const phase = project.phases.find((p) => p.phase === fw.id)
                            return (
                              <Badge
                                key={fw.id}
                                variant="outline"
                                className={`text-[9px] px-1.5 py-0 ${
                                  phase?.status === 'completed'
                                    ? 'border-emerald-500/40 text-emerald-600'
                                    : phase?.status === 'in_progress'
                                    ? 'border-blue-500/40 text-blue-600'
                                    : 'text-muted-foreground'
                                }`}
                              >
                                {fw.label.split(' ').slice(-1)[0]}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
