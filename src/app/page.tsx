'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { AppSidebar } from '@/components/app-sidebar'
import { DashboardView } from '@/components/dashboard-view'
import { ProjectWorkspace } from '@/components/project-workspace'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Home() {
  const { currentView, projects, setProjects, currentProjectId } = useAppStore()

  // Load projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        setProjects(data)
      } catch (e) {
        console.error('Failed to load projects:', e)
      }
    }
    loadProjects()
  }, [])

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 max-w-6xl mx-auto">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'workspace' && currentProjectId && <ProjectWorkspace />}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
