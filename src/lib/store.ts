import { create } from 'zustand'

export interface Project {
  id: string
  name: string
  description: string | null
  status: string
  createdAt: string
  updatedAt: string
  phases: ProjectPhase[]
}

export interface ProjectPhase {
  id: string
  projectId: string
  phase: string
  status: string
  data: string | null
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AppState {
  currentView: string
  projects: Project[]
  currentProjectId: string | null
  sidebarOpen: boolean
  chatMessages: ChatMessage[]
  chatLoading: boolean
  setCurrentView: (view: string) => void
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
  setCurrentProjectId: (id: string | null) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  addChatMessage: (message: ChatMessage) => void
  setChatLoading: (loading: boolean) => void
  clearChat: () => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'dashboard',
  projects: [],
  currentProjectId: null,
  sidebarOpen: true,
  chatMessages: [],
  chatLoading: false,
  setCurrentView: (view) => set({ currentView: view }),
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProjectId:
        state.currentProjectId === id ? null : state.currentProjectId,
    })),
  setCurrentProjectId: (id) => set({ currentProjectId: id }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setChatLoading: (loading) => set({ chatLoading: loading }),
  clearChat: () => set({ chatMessages: [] }),
}))
