'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb,
  Plus,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  Sparkles,
  Trash2,
  MoreHorizontal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const PHASE_LABELS: Record<string, string> = {
  problem_statement: 'Problem Statement',
  first_principles: 'First Principles',
  design_thinking: 'Design Thinking',
  theory_of_constraints: 'Constraints',
  lean_startup: 'Lean Startup',
}

export function AppSidebar() {
  const {
    currentView,
    projects,
    currentProjectId,
    setCurrentProjectId,
    deleteProject,
    setCurrentView,
    sidebarOpen,
    toggleSidebar,
  } = useAppStore()

  const currentProject = projects.find((p) => p.id === currentProjectId)

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 64 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="h-screen flex flex-col border-r border-border bg-card sticky top-0 z-30"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h1 className="font-bold text-sm gradient-text">Product Incubator</h1>
              <p className="text-[10px] text-muted-foreground">Innovation Workspace</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-3 py-3 border-b border-border shrink-0">
        <Button
          variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
          size={sidebarOpen ? 'default' : 'icon'}
          className={cn('w-full justify-start gap-2', !sidebarOpen && 'px-2')}
          onClick={() => {
            setCurrentView('dashboard')
            setCurrentProjectId(null)
          }}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          {sidebarOpen && <span>Dashboard</span>}
        </Button>
      </div>

      {/* Projects List */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2"
              >
                Projects
              </motion.p>
            )}
          </AnimatePresence>

          {projects.map((project) => (
            <div key={project.id} className="group relative">
              <button
                onClick={() => {
                  setCurrentProjectId(project.id)
                  setCurrentView('workspace')
                }}
                className={cn(
                  'w-full flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-all hover:bg-accent',
                  currentProjectId === project.id && 'bg-accent text-accent-foreground'
                )}
              >
                <FolderKanban className="w-4 h-4 shrink-0 text-muted-foreground" />
                {sidebarOpen && (
                  <div className="flex-1 min-w-0 text-left">
                    <p className="truncate font-medium">{project.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {project.phases?.length || 0} phases
                    </p>
                  </div>
                )}
              </button>

              {/* Project actions */}
              {sidebarOpen && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="w-3 h-3 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}

          {projects.length === 0 && sidebarOpen && (
            <div className="text-center py-8 px-2">
              <Lightbulb className="w-8 h-8 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-xs text-muted-foreground">
                No projects yet. Start by creating your first innovation project.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer with toggle */}
      <div className="px-3 py-3 border-t border-border shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="w-full"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>
    </motion.aside>
  )
}
