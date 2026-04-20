import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const phases = await db.projectPhase.findMany({
    where: { projectId: id },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(phases)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const phase = await db.projectPhase.create({
    data: {
      projectId: id,
      phase: body.phase,
      status: body.status || 'not_started',
      data: body.data ? JSON.stringify(body.data) : null,
    },
  })
  return NextResponse.json(phase, { status: 201 })
}
