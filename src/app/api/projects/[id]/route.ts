import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const project = await db.project.findUnique({
    where: { id },
    include: { phases: true },
  })
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(project)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const project = await db.project.update({
    where: { id },
    data: { name: body.name, description: body.description, status: body.status },
    include: { phases: true },
  })
  return NextResponse.json(project)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await db.project.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
