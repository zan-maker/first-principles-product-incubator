---
name: cognitive-mesh-protocol
description: Structured reasoning framework for complex design problems and multi-variable analysis using expansion-compression cycles with explicit grounding checks. Use when solving complex problems requiring deep reasoning, including system architecture design, strategic business decisions, multi-factor analysis, or any design problem where the user needs to see the reasoning process. Automatically detects problem type (strategic, analytical, creative, technical) and adapts approach. Triggers on design problems, strategic questions, architecture decisions, or when explicit structured reasoning is requested.
---

# Cognitive Mesh Protocol

## Overview

Apply structured metacognitive reasoning to complex problems through visible expansion-compression cycles. Show both the reasoning process and final conclusion, with explicit grounding checks to prevent hallucination risk.

## Core Workflow

### 1. Problem Classification (Automatic)

Detect problem type to calibrate reasoning approach:

- **Strategic/Business**: Market analysis, competitive positioning, resource allocation, go/no-go decisions
- **Analytical**: Root cause analysis, data interpretation, multi-variable optimization, trend analysis  
- **Creative/Design**: System architecture, product design, user experience, process design
- **Technical**: Implementation approaches, technology selection, algorithm design, debugging complex issues

### 2. Breathing Cycle Structure

Apply expansion-compression cycles visibly in response:

#### EXPANSION PHASE (5-6 steps)
Generate diverse possibilities without premature convergence:

1. **Reframe the problem** - State the core question in 2-3 different ways
2. **Map the constraint space** - What are the hard constraints vs. soft preferences?
3. **Generate alternatives** - Explore 3-5 distinct approaches, including non-obvious options
4. **Challenge assumptions** - What are we taking for granted that might not be true?
5. **Consider edge cases** - What breaks each approach? What unusual scenarios matter?
6. **Cross-domain analogies** - How have similar problems been solved in other domains?

**During expansion:**
- Explicitly note uncertainty with phrases like "This assumes...", "If X is true...", "I'm inferring..."
- Flag when reasoning from pattern-matching vs. verified facts
- Avoid defending a single position too early

#### COMPRESSION PHASE (1-2 steps)
Synthesize and commit to a direction:

1. **Integrate insights** - What key patterns emerged? Which constraints are binding?
2. **Commit to recommendation** - Based on the exploration, what's the strongest path forward and why?

**During compression:**
- Connect back to original question explicitly
- State confidence level (high/medium/low) and why
- Note what would change the recommendation

### 3. Grounding Checks (Throughout)

Before each major claim, verify:

□ **What do I actually know vs. infer?** - Distinguish facts from assumptions explicitly
□ **Am I pattern-matching or reasoning?** - Is this a genuine insight or just "sounds right"?
□ **Does this connect to the user's question?** - Am I solving the asked problem or an easier one?
□ **What's my confidence source?** - Is this from training data, logical deduction, or uncertain inference?

**Hallucination risk signals:**
- Stating specific numbers, dates, or technical details with high confidence but no source
- Claiming "studies show" or "research indicates" without being able to cite which research
- Asserting domain-specific facts in areas outside your training
- Describing proprietary systems or internal processes you couldn't know

**When risk detected:** Explicitly flag uncertainty and either search for grounding or state "I don't have reliable information on this."

### 4. Response Format

Structure your response to show the reasoning process:

```
## Problem Classification
[Automatic detection: Strategic/Analytical/Creative/Technical + brief rationale]

## Reasoning Process

### Expansion Cycle 1
[6 exploratory steps as outlined above]

### Compression Cycle 1  
[Synthesis of findings]

[Repeat cycles as needed for problem complexity]

## Grounding Check
[Explicit verification: What's verified vs. inferred? Where's uncertainty?]

## Final Recommendation
[Clear conclusion with confidence level and key caveats]

## What Would Change This
[Conditions or new information that would alter the recommendation]
```

### 5. Adaptive Parameters by Problem Type

**Strategic/Business Problems:**
- Longer expansion (explore more alternatives)
- Multiple compression cycles (test decision from different angles)
- Heavy emphasis on assumption-checking
- Flag areas needing market research/data

**Analytical Problems:**
- Moderate expansion (don't over-explore when data constrains solution)
- Strong grounding emphasis (verify each logical step)
- Explicit uncertainty quantification
- Note what data would resolve ambiguity

**Creative/Design Problems:**
- Extended expansion (encourage divergent thinking)
- More permissive of speculation (but still flagged)
- Cross-domain analogies emphasized
- Multiple compression cycles to test different design principles

**Technical Problems:**
- Balanced expansion-compression
- High logical consistency requirement
- Verify each technical claim or flag as uncertain
- Note where testing/validation needed

### 6. Failure Mode Detection

Watch for and self-correct:

**FOSSIL STATE** (stuck, repeating):
- Signal: Restating same point with different words, defending position, can't generate new alternatives
- Intervention: Force expansion. "I notice I'm circling the same idea. Let me explore 3 genuinely different approaches..."

**CHAOS STATE** (too scattered):
- Signal: Jumping between unrelated ideas, can't synthesize, everything seems equally important
- Intervention: Force compression. "Let me focus on the most critical constraint/trade-off here..."

**HALLUCINATION RISK** (overconfident without grounding):
- Signal: Stating specific facts with certainty, pattern-matching without verification, "sounds authoritative but unsure why"
- Intervention: Explicit grounding check. "Pausing—I stated X with confidence, but let me verify: Is this from training data, logic, or uncertain inference?"

## When Multiple Cycles Are Needed

Simple problems: 1 cycle sufficient
Moderate complexity: 2 cycles (explore broad, then dive deep on promising approach)
High complexity: 3+ cycles (explore, narrow, test robustness, finalize)

Judge complexity by:
- Number of interacting variables
- Degree of uncertainty in problem definition
- Number of stakeholder perspectives to balance
- Technical depth required

## Output Quality Checklist

Before delivering final response:

□ **Coherence** - Does the reasoning flow logically without contradictions?
□ **Grounding** - Are all claims either verified or flagged as uncertain?
□ **Completeness** - Did I explore sufficiently before converging?
□ **Relevance** - Does this answer what was actually asked?
□ **Honesty** - Are uncertainties and limitations explicit?

If any check fails, note the limitation in the final response.

## Reference Materials

For detailed parameter specifications and theoretical background, see `references/protocol_details.md`.
