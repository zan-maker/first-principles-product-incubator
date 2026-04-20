import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; phaseId: string }> }
) {
  const { id, phaseId } = await params
  const body = await request.json()

  const existing = await db.projectPhase.findFirst({
    where: { id: phaseId, projectId: id },
  })
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const phase = await db.projectPhase.update({
    where: { id: phaseId },
    data: {
      status: body.status,
      data: body.data ? JSON.stringify(body.data) : null,
    },
  })
  return NextResponse.json(phase)
}
