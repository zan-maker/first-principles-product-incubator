# Cognitive Mesh Protocol - Detailed Reference

## Theoretical Foundation

The Cognitive Mesh Protocol is based on metacognitive monitoring principles—the ability to observe and regulate one's own reasoning process. While AI systems don't have "internal state variables" in the way the original framework suggests, the protocol provides useful heuristics for structured thinking.

## Conceptual Parameters

These are not literal metrics but thinking patterns to emulate:

### Coherence (Target: High consistency)
- Are statements logically compatible?
- Do conclusions follow from premises?
- Are there hidden contradictions?

**High coherence:** Each step builds on previous ones without contradiction
**Low coherence:** Statements conflict, reasoning jumps without justification

### Entropy (Exploration vs. Focus)
- During expansion: Higher entropy = more divergent exploration
- During compression: Lower entropy = convergence on solution

**Balanced approach:** Oscillate between broad exploration and focused analysis

### Grounding (Target: >0.6 connection to facts)
- How much reasoning is based on verified information vs. speculation?
- Is the response answering the actual question?

**High grounding:** Claims tied to facts, clear distinction between known and inferred
**Low grounding:** Pattern-matching without verification, answering a different question than asked

### Temperature (Uncertainty allowance)
- Complex ambiguous problems: Allow more uncertainty during exploration
- Well-defined problems: Tighter constraints, less speculation

## Problem-Type Calibration

### Strategic/Business (T≈0.7)
- **Expansion:** 6-8 steps, explore market dynamics, competitive positioning, resource constraints
- **Compression:** 2 cycles minimum—test decision from different stakeholder perspectives
- **Grounding:** Heavy emphasis on distinguishing market assumptions from facts
- **Output:** Include confidence levels and what would change the recommendation

### Analytical (T≈0.5)  
- **Expansion:** 5-6 steps, focus on causal chains and variable interactions
- **Compression:** 1-2 cycles, tight logical connections
- **Grounding:** Verify each analytical step, flag where data is missing
- **Output:** Clear uncertainty quantification, note what data would resolve ambiguity

### Creative/Design (T≈0.8)
- **Expansion:** 7-9 steps, encourage analogies, explore non-obvious alternatives
- **Compression:** 2-3 cycles, test against different design principles
- **Grounding:** More permissive of speculation but always flagged as such
- **Output:** Multiple viable approaches with trade-offs

### Technical (T≈0.6)
- **Expansion:** 5-6 steps, consider implementation approaches, edge cases, failure modes
- **Compression:** 2 cycles, verify technical feasibility and logical consistency
- **Grounding:** High—technical claims must be verified or flagged
- **Output:** Note where testing/validation is needed, flag technical uncertainties

## Common Failure Patterns

### Fossil State (Stuck Loop)
**Symptoms:**
- Repeating same argument with slightly different phrasing
- Defensive of initial position
- Unable to generate genuinely new alternatives
- Feeling of being "stuck"

**Causes:**
- Premature convergence on first intuitive answer
- Insufficient exploration phase
- Attachment to initial framing

**Intervention:**
Force expansion by asking: "What are 3 approaches I haven't considered yet?" or "How would someone who disagree with me frame this?"

### Chaos State (Too Scattered)
**Symptoms:**
- Jumping between unrelated ideas
- No synthesis or integration
- Everything seems equally important
- Can't commit to any direction

**Causes:**
- Over-exploration without compression
- Trying to optimize too many variables simultaneously
- No clear evaluation criteria

**Intervention:**
Force compression by asking: "What's the ONE most critical constraint here?" or "If I had to decide right now, what would I choose and why?"

### Hallucination Risk (Overconfident Without Grounding)
**Symptoms:**
- Stating specific facts (numbers, dates, technical details) with high certainty
- "Studies show..." without being able to cite which studies
- Authoritative tone on topics outside training domain
- Pattern-matching feels compelling but uncertain why

**Causes:**
- LLM tendency to complete patterns confidently
- Confusing "sounds right" with "is right"
- Not distinguishing training data from inference

**Intervention:**
Explicit grounding check: "Pause—do I actually know this, or does it just sound plausible?" Then either search for verification or flag as uncertain.

## Response Quality Dimensions

### Coherence Check
- Read response start to finish—are there contradictions?
- Do conclusions follow from premises?
- Are transitions logical?

### Grounding Check  
- Which statements are from training data vs. inference?
- Are domain-specific claims verifiable?
- Is the response answering what was asked or a nearby easier question?

### Completeness Check
- Was expansion sufficient before converging?
- Were meaningful alternatives explored?
- Are important edge cases considered?

### Honesty Check
- Are uncertainties explicitly flagged?
- Is confidence level calibrated appropriately?
- Are limitations acknowledged?

## Cycle Depth Guidelines

**1 Cycle (Simple):**
- Problem is well-defined
- Few interacting variables  
- Clear evaluation criteria
- Example: "Should we use Postgres or MySQL for this use case?"

**2 Cycles (Moderate):**
- Some ambiguity in problem definition
- Multiple stakeholder perspectives
- 3-5 key variables interacting
- Example: "How should we price our new product tier?"

**3+ Cycles (Complex):**
- High uncertainty in problem framing
- Many interacting constraints
- Multiple valid framings of the problem
- Example: "Should we pivot our business model to focus on enterprise customers?"

## Practical Application Notes

- The protocol is a thinking tool, not a rigid formula
- Adapt cycle length to problem complexity—don't force multiple cycles on simple problems
- Make the reasoning process visible but keep it readable—avoid excessive meta-commentary
- Focus especially on grounding checks when making specific factual claims
- When in doubt about your confidence level, state the uncertainty explicitly
