import ZAI from 'z-ai-web-dev-sdk'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { framework, phase, data } = await request.json()

    if (!framework || !phase || !data) {
      return NextResponse.json(
        { error: 'framework, phase, and data are required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const systemPrompts: Record<string, string> = {
      first_principles:
        'You are an expert in MIT First Principles thinking. Help the user break down problems into fundamental truths, apply the Fire Hose Test (3I Model: Important, Impactful, Irreversible), and think like a founder.',
      design_thinking:
        'You are an expert in Design Thinking methodology. Guide the user through Empathize, Define, Ideate, Prototype, and Test phases with actionable insights.',
      theory_of_constraints:
        'You are an expert in the Theory of Constraints (TOC). Help identify system bottlenecks, apply the Five Focusing Steps, and optimize throughput.',
      lean_startup:
        'You are an expert in Lean Startup methodology. Help design experiments, validate hypotheses, and navigate Build-Measure-Learn loops.',
      bridge_framework:
        'You are an expert in the Bridge Framework for problem/opportunity articulation. Help craft compelling statements using observable tensions, 5 Whys, and consequence analysis.',
      general:
        'You are an expert product innovation consultant. Provide structured, actionable insights for product development.',
    }

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `${
            systemPrompts[framework] || systemPrompts.general
          } Analyze the following ${phase} data and provide:
1. Key insights and observations
2. Actionable suggestions (numbered list)
3. Potential risks or blind spots
4. Recommended next steps
5. One thought-provoking question to consider

Keep your response concise but thorough. Use markdown formatting for clarity.`,
        },
        {
          role: 'user',
          content:
            typeof data === 'string' ? data : JSON.stringify(data, null, 2),
        },
      ],
    })

    const messageContent = completion.choices[0]?.message?.content
    return NextResponse.json({ analysis: messageContent })
  } catch (error) {
    console.error('AI analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI analysis' },
      { status: 500 }
    )
  }
}
