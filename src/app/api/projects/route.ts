import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const projects = await db.project.findMany({
    include: { phases: true },
    orderBy: { updatedAt: 'desc' },
  })
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, description } = body
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  const project = await db.project.create({
    data: { name, description },
    include: { phases: true },
  })
  return NextResponse.json(project, { status: 201 })
}
