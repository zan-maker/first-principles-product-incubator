'use client'

import { cn } from '@/lib/utils'

interface PhaseStepperProps {
  phases: { id: string; label: string; description: string }[]
  currentPhase: number
  onPhaseChange: (phase: number) => void
  completedPhases?: number[]
}

export function PhaseStepper({
  phases,
  currentPhase,
  onPhaseChange,
  completedPhases = [],
}: PhaseStepperProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {phases.map((phase, index) => {
          const isCompleted = completedPhases.includes(index)
          const isCurrent = index === currentPhase
          const isPast = index < currentPhase

          return (
            <div key={phase.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => onPhaseChange(index)}
                className={cn(
                  'flex flex-col items-center gap-1.5 group cursor-pointer transition-all duration-200',
                  isCurrent && 'scale-105'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2',
                    isCompleted
                      ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/25'
                      : isCurrent
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-muted border-muted-foreground/20 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary'
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-center">
                  <p
                    className={cn(
                      'text-xs font-medium transition-colors',
                      isCurrent
                        ? 'text-primary'
                        : isCompleted
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {phase.label}
                  </p>
                </div>
              </button>
              {index < phases.length - 1 && (
                <div className="flex-1 mx-2 mt-[-1.25rem]">
                  <div className="h-0.5 bg-muted relative">
                    <div
                      className={cn(
                        'absolute top-0 left-0 h-full bg-primary transition-all duration-500',
                        isPast ? 'w-full' : isCurrent ? 'w-1/2' : 'w-0'
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
