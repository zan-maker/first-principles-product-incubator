# Bridge Framework - Validation Checklist & Quality Standards

## Purpose

This document provides detailed validation criteria for assessing the quality and completeness of problem/opportunity/situation statements created using the Bridge Framework methodology.

## The Five Quality Dimensions

### 1. Clear Initiating Moment

**What to look for:**
- Specific trigger event or observation identified
- Observable facts (not assumptions or opinions)
- Temporal clarity (when this surfaced)
- Stakeholder perspective (who noticed/raised this)

**Good Examples:**
- "In Q3 board meeting, CFO presented data showing 40% of new customers churn within 60 days"
- "Three enterprise prospects in two weeks asked for SSO integration we don't offer"
- "After the tech lead departure, sprint velocity dropped 35% for two consecutive sprints"

**Poor Examples:**
- "Things haven't been working well lately" (vague, no specifics)
- "We need to improve" (no triggering moment)
- "Everyone knows this is a problem" (assumption, not observable)

**Validation Questions:**
- Can you point to a specific date, meeting, or event?
- What data, conversation, or incident revealed this?
- Would multiple stakeholders describe the same triggering moment?

### 2. Root Cause Exploration

**What to look for:**
- Evidence of 5 Whys or similar systematic exploration
- Movement from symptom to structural cause
- Identification of one of these root types:
  - Systems gap (missing or broken system)
  - Misaligned assumption (operating on outdated/wrong belief)
  - Missing capability (lack of skill, tool, or resource)
  - Tension between "is" and "should be"

**Good Examples:**
- "Teams estimate based on individual capacity rather than system capacity, ignoring dependencies that account for 60% of delays"
- "Pricing model assumes monthly contracts, but market has shifted to annual commitments with quarterly reviews"
- "No formal handoff process exists between sales and implementation, causing each team to maintain separate customer context"

**Poor Examples:**
- "People aren't motivated" (judgment, not structural)
- "We're just not good at this" (self-assessment, not cause)
- "Leadership doesn't care" (blame, not analysis)

**Validation Questions:**
- Did we ask "why" at least 5 times?
- Does the cause describe structure/system vs. individual behavior?
- Would fixing this cause address multiple symptoms?
- Is this a root cause or still a symptom?

### 3. Consequences of Inaction

**What to look for:**
- Specific costs across multiple dimensions
- Timeline for cost accumulation
- Both quantitative and qualitative impacts
- Progressive worsening (not static state)

**Cost Dimensions:**
- **Strategic**: Market position, competitive advantage, capability development
- **Cultural**: Trust, morale, alignment, retention, brand
- **Financial**: Revenue, margin, efficiency, opportunity cost

**Good Examples:**
- "Each quarter, we lose an estimated $200K in enterprise deals to competitors with SSO. Moreover, our sales team increasingly positions us as 'SMB-focused,' creating a self-fulfilling downmarket drift that threatens our 2026 IPO positioning."
- "Without a formal handoff process, each new customer experiences an average 3-week 'context rebuild' period. Customer satisfaction scores drop 22 points during implementation (vs. post-sale), and our NPS among customers <90 days is 31 vs. 68 for mature customers. The CS team spends 40% of time reconstructing context that sales already gathered."

**Poor Examples:**
- "It would be bad" (no specificity)
- "We might lose customers" (vague possibility)
- "Performance will suffer" (no dimensions or timeline)

**Validation Questions:**
- Can you quantify at least one cost dimension?
- What happens in 3 months? 6 months? 12 months?
- Are consequences strategic, cultural, AND financial - or just one?
- Does the cost accelerate or compound over time?

### 4. Strategic Connection

**What to look for:**
- Explicit link to organizational mission or vision
- Connection to strategic priorities or OKRs
- Broader pattern recognition (not just local issue)
- Stakeholder resonance beyond immediate team

**Good Examples:**
- "Our mission is to democratize enterprise-grade finance tools for mid-market companies. By limiting ourselves to SMB due to lack of enterprise auth, we're actively undermining that mission and reinforcing the very barriers we exist to break down."
- "This pattern - optimizing for individual velocity vs. system flow - shows up in three departments. It reflects a cultural assumption that speed equals impact, when our stated value is 'sustainable excellence.' We're inadvertently rewarding behavior that contradicts our culture."

**Poor Examples:**
- "The CEO mentioned this once" (authority appeal, not strategic connection)
- "It's important" (claim, not connection)
- "Everyone agrees" (consensus, not strategic link)

**Validation Questions:**
- Does this connect to documented mission/vision/values?
- Would executives recognize this as strategically significant?
- Is this a symptom of a broader pattern or one-off issue?
- Does solving this unlock other strategic priorities?

### 5. Vivid and Motivating Language

**What to look for:**
- Concrete imagery and specific examples
- Emotional resonance (not dry/clinical)
- Active voice and strong verbs
- Tension is palpable
- Stakeholders see themselves in the description

**Good Examples:**
- "Picture a new customer's first week: They've just signed a $50K contract based on our sales demo. Then they meet the implementation team who asks all the same qualification questions again. By day 3, the customer asks 'Do you people talk to each other?' By week 2, they're questioning whether they made the right choice. By week 4, they're updating their Glassdoor and G2 reviews."

**Poor Examples:**
- "The current process is suboptimal and requires optimization" (bureaucratic, lifeless)
- "Stakeholders have expressed concerns about the workflow" (passive, distant)
- "Improvements are needed in the onboarding domain" (abstract, unmotivating)

**Validation Questions:**
- Does this language create a mental picture?
- Would a stakeholder feel understood reading this?
- Does the tension make you want to act?
- Is the language energizing or draining?

## Complete Statement Structure

A high-quality Bridge Framework statement integrates all five dimensions:

```
## [Problem/Opportunity/Situation] Statement

[HOOK - Observable tension with vivid detail]

In [specific moment/event], [stakeholder] observed [concrete fact] that revealed [nature of tension]. This triggered attention because [immediate impact or signal].

[ROOT CAUSE - Structural analysis]

At its core, this happens because [systems gap / misaligned assumption / missing capability / tension between is and should be]. The current [structure/process/belief] assumes [assumption], but [reality] has shifted to [new reality]. This creates [specific misalignment].

We've traced this through the 5 Whys: [brief summary of causal chain from symptom to structural cause].

[CONSEQUENCES - Multi-dimensional costs with timeline]

If unaddressed:
- Strategically: [specific strategic cost with timeline]
- Culturally: [specific cultural cost with examples]  
- Financially: [quantified financial impact and opportunity cost]

This cost compounds because [explanation of acceleration pattern].

[STRATEGIC CONNECTION - Link to mission/vision]

This matters beyond [local context] because [connection to broader strategic priority]. Our mission to [mission statement] depends on [capability this issue affects]. By allowing [root cause] to persist, we actively undermine [strategic objective] and reinforce [pattern we're trying to break].

This is one instance of a broader pattern where [systemic insight].
```

## Red Flags - Statement Quality Issues

### 🚩 Solution Embedded

**Signal**: Statement includes "we should," "we need to," "the solution is"

**Fix**: Remove all solution language. If user insists, note solutions separately but keep statement pure problem space.

### 🚩 Blame-Focused

**Signal**: Statement attributes cause to individual character/motivation

**Fix**: Redirect to systems/structure. Replace "people don't care" with "current system doesn't incentivize X" or "people lack visibility into Y."

### 🚩 Symptom-Level

**Signal**: Stops at first or second "why" without reaching structural cause

**Fix**: Continue 5 Whys process. Ask "and what causes THAT to happen?"

### 🚩 Generic Language

**Signal**: Could apply to any organization ("improve efficiency," "be more strategic")

**Fix**: Add specificity. Replace abstractions with concrete examples, data points, stories.

### 🚩 Single-Dimension Cost

**Signal**: Only financial impact mentioned, or only "people will be unhappy"

**Fix**: Force articulation across all three dimensions - strategic, cultural, financial.

### 🚩 No Strategic Link

**Signal**: Statement stays entirely local ("the sales team has a problem")

**Fix**: Zoom out. Ask "why does this matter to the organization?" and "what broader pattern does this exemplify?"

### 🚩 Passive Language

**Signal**: Lots of "should be addressed," "requires attention," "has been identified"

**Fix**: Active voice. Name the tension directly. Use strong verbs.

## Advanced Validation - The "So What?" Test

After drafting a statement, apply the "So What?" test:

1. Read statement to someone unfamiliar with the context
2. After each major claim, ask "So what?"
3. If they can easily ask "So what?" the claim needs more development
4. Keep going until "So what?" feels inappropriate because the stakes are obvious

**Example:**

Statement: "Customer onboarding takes too long"
So what?: *"Because we lose customers"*
So what?: *"Because we lose revenue"*
So what?: *"Because we miss our growth targets"*
So what?: *"Because we can't fund the product roadmap"*
So what?: *"Because we fall behind competitors and the gap becomes insurmountable"*
So what?: [Feels inappropriate to ask - stakes are clear]

## Cultural Adaptation

Different organizations have different norms for how direct/vivid language should be. Adapt accordingly:

**Startup/Scale-up**: Can use very direct, urgent language
**Enterprise**: May need more measured tone while maintaining specificity
**Government/Academic**: May require more formal structure but still demand concrete examples

The five quality dimensions remain constant. The tone can flex.

## Iteration Protocol

Most statements require 2-4 iterations to reach high quality:

**Iteration 1**: Get basic structure (entry point, trigger, initial cause, some consequences)
**Iteration 2**: Deepen root cause through 5 Whys
**Iteration 3**: Sharpen consequences and strategic connection
**Iteration 4**: Refine language for vividness and motivation

Don't expect perfection in first draft. The process itself creates insight.

## Completion Signal

You know the statement is ready when:

1. You can answer all validation questions confidently
2. Stakeholders read it and say "yes, exactly that"
3. The statement creates urgency to act
4. No one asks "but why does this matter?"
5. The root cause feels like an insight, not common knowledge
6. You could brief an executive in 60 seconds using this statement

## Version

Document Version: 1.0.0
Based on: Bridge Framework methodology
Last Updated: 2025-11-21
