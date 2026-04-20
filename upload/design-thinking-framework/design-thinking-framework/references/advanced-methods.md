# Advanced Design Thinking Methods

Extended toolkit for complex design challenges.

## Service Blueprint

**Purpose**: Map the entire service ecosystem including frontstage (customer-visible) and backstage (internal operations).

### Template

```
SERVICE BLUEPRINT: [Service Name]

PHYSICAL         │         │         │         │         │
EVIDENCE         │ [Item]  │ [Item]  │ [Item]  │ [Item]  │ [Item]
─────────────────┼─────────┼─────────┼─────────┼─────────┼─────────
CUSTOMER         │         │         │         │         │
ACTIONS          │[Action] │[Action] │[Action] │[Action] │[Action]
═════════════════╪═════════╪═════════╪═════════╪═════════╪═════════
LINE OF INTERACTION (customer can see above)
═════════════════╪═════════╪═════════╪═════════╪═════════╪═════════
FRONTSTAGE       │         │         │         │         │
EMPLOYEE         │[Action] │[Action] │[Action] │[Action] │[Action]
ACTIONS          │         │         │         │         │
─────────────────┼─────────┼─────────┼─────────┼─────────┼─────────
LINE OF VISIBILITY (customer cannot see below)
─────────────────┼─────────┼─────────┼─────────┼─────────┼─────────
BACKSTAGE        │         │         │         │         │
EMPLOYEE         │[Action] │[Action] │[Action] │[Action] │[Action]
ACTIONS          │         │         │         │         │
─────────────────┼─────────┼─────────┼─────────┼─────────┼─────────
LINE OF INTERNAL INTERACTION
─────────────────┼─────────┼─────────┼─────────┼─────────┼─────────
SUPPORT          │         │         │         │         │
PROCESSES        │[System] │[System] │[System] │[System] │[System]
─────────────────┼─────────┼─────────┼─────────┼─────────┼─────────
TIME             │ [X min] │ [X min] │ [X min] │ [X min] │ [X min]
─────────────────┼─────────┼─────────┼─────────┼─────────┼─────────
PAIN POINTS      │ ⚠️      │         │ ⚠️      │         │ ⚠️
─────────────────┼─────────┼─────────┼─────────┼─────────┼─────────
OPPORTUNITIES    │         │ 💡      │         │ 💡      │
```

### When to Use
- Service design projects
- Omnichannel experience design
- Identifying operational improvements
- Aligning customer experience with internal processes

---

## Jobs to Be Done (JTBD)

**Purpose**: Understand the underlying "job" customers hire products/services to do.

### Job Story Format

```
WHEN [situation/trigger]
I WANT TO [motivation/goal]
SO I CAN [expected outcome]
```

### JTBD Interview Guide

```
JOBS TO BE DONE INTERVIEW

PURCHASE/ADOPTION TIMELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

First Thought ──→ Passive Looking ──→ Active Looking ──→ Decision ──→ Use

FIRST THOUGHT
- When did you first realize you needed something?
- What was happening in your life/work?
- What triggered that thought?

PASSIVE LOOKING
- What did you do about it initially?
- Did you consider alternatives or workarounds?
- How long did you think about it before acting?

ACTIVE LOOKING
- What made you start actively looking?
- What options did you consider?
- What criteria mattered most?

DECISION
- Why did you choose [product/solution]?
- What almost made you choose something else?
- Who else was involved in the decision?

USE
- How did you feel after your first use?
- Did it do the job you expected?
- What surprised you?

FORCES ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PUSH OF CURRENT SITUATION     PULL OF NEW SOLUTION
(What's driving change)        (What's attracting them)
→ [Push factor 1]              ← [Pull factor 1]
→ [Push factor 2]              ← [Pull factor 2]

ANXIETY OF NEW SOLUTION       HABIT OF CURRENT BEHAVIOR
(What holds them back)         (What keeps them stuck)
→ [Anxiety 1]                  ← [Habit 1]
→ [Anxiety 2]                  ← [Habit 2]

JOB STATEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Main Job: [Functional job being done]
Related Jobs: [Other jobs being done simultaneously]
Emotional Job: [How they want to feel]
Social Job: [How they want to be perceived]
```

---

## Value Proposition Canvas

**Purpose**: Map how your solution creates value for customers.

### Template

```
VALUE PROPOSITION CANVAS

CUSTOMER PROFILE                    VALUE MAP
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  CUSTOMER JOBS                    PRODUCTS & SERVICES               │
│  ┌────────────────┐              ┌────────────────┐                │
│  │ Functional:    │              │                │                │
│  │ - [Job]        │              │ [Feature]      │                │
│  │ - [Job]        │              │ [Feature]      │                │
│  │                │              │ [Feature]      │                │
│  │ Emotional:     │              │                │                │
│  │ - [Job]        │ ←──────────→ │                │                │
│  │                │    FIT?      └────────────────┘                │
│  │ Social:        │                                                 │
│  │ - [Job]        │                                                 │
│  └────────────────┘                                                 │
│                                                                     │
│  PAINS                            PAIN RELIEVERS                    │
│  ┌────────────────┐              ┌────────────────┐                │
│  │ - [Pain 1]     │              │ - [Reliever 1] │                │
│  │ - [Pain 2]     │ ←──────────→ │ - [Reliever 2] │                │
│  │ - [Pain 3]     │    FIT?      │ - [Reliever 3] │                │
│  └────────────────┘              └────────────────┘                │
│                                                                     │
│  GAINS                            GAIN CREATORS                     │
│  ┌────────────────┐              ┌────────────────┐                │
│  │ - [Gain 1]     │              │ - [Creator 1]  │                │
│  │ - [Gain 2]     │ ←──────────→ │ - [Creator 2]  │                │
│  │ - [Gain 3]     │    FIT?      │ - [Creator 3]  │                │
│  └────────────────┘              └────────────────┘                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

FIT ASSESSMENT:
- Jobs addressed: [X/Y]
- Pains relieved: [X/Y]
- Gains created: [X/Y]

GAPS TO ADDRESS:
1. [Unaddressed job/pain/gain]
2. [Unaddressed job/pain/gain]
```

---

## Assumption Mapping

**Purpose**: Identify and prioritize assumptions to test.

### Template

```
ASSUMPTION MAP

List all assumptions about your concept:

DESIRABILITY (Will people want this?)
1. [Assumption about user need]
2. [Assumption about user behavior]
3. [Assumption about willingness to change]

FEASIBILITY (Can we build this?)
1. [Assumption about technology]
2. [Assumption about skills/capabilities]
3. [Assumption about timeline]

VIABILITY (Is this sustainable?)
1. [Assumption about revenue]
2. [Assumption about costs]
3. [Assumption about market size]

ASSUMPTION PRIORITIZATION MATRIX

                    High Impact
                         │
              ┌──────────┼──────────┐
              │   TEST   │  TEST    │
              │   NEXT   │  FIRST   │
              │          │          │
    Low       │          │          │    High
    Certainty ──────────────────────────► Certainty
              │          │          │
              │  WATCH   │  OK TO   │
              │          │  ASSUME  │
              └──────────┼──────────┘
                         │
                    Low Impact

TOP 3 ASSUMPTIONS TO TEST:
1. [Assumption] - Test method: [How to validate]
2. [Assumption] - Test method: [How to validate]
3. [Assumption] - Test method: [How to validate]
```

---

## Experience Prototyping

**Purpose**: Simulate the full experience, not just the interface.

### Types of Experience Prototypes

**Body Storming**
- Act out the experience physically
- Move through the space where the experience happens
- Feel the emotions and physical sensations

**Desktop Walkthrough**
- Use props (Lego, dolls, sketches) to simulate journey
- Talk through what each actor experiences
- Identify gaps and pain points

**Service Safari**
- Experience analogous services firsthand
- Document what works and doesn't
- Apply insights to your design

**Wizard of Oz**
- Human performs the backend manually
- User experiences as if automated
- Test value proposition before building technology

### Experience Prototype Planning

```
EXPERIENCE PROTOTYPE PLAN

CONCEPT: [Name]
EXPERIENCE TO SIMULATE: [What part of the full experience]

SETUP:
- Location: [Where]
- Props needed: [List]
- Roles needed: [Who plays what]
- Duration: [How long]

SCENARIO:
[Write the script/scenario to be acted out]

QUESTIONS TO ANSWER:
1. [What we want to learn about the experience]
2. [What we want to learn about emotions]
3. [What we want to learn about friction]

OBSERVATION FOCUS:
- Emotional reactions at [moment]
- Confusion points at [moment]
- Delight moments at [moment]
```

---

## Design Critique Framework

**Purpose**: Give constructive feedback on designs.

### I Like, I Wish, What If

```
DESIGN CRITIQUE: [Concept Name]

I LIKE... (What's working well)
- [Positive observation]
- [Positive observation]
- [Positive observation]

I WISH... (Constructive suggestions)
- [Improvement suggestion]
- [Improvement suggestion]
- [Improvement suggestion]

WHAT IF... (Provocations and possibilities)
- [Creative possibility]
- [Creative possibility]
- [Creative possibility]

PRIORITY CHANGES:
1. [Most important change to make]
2. [Second priority]
3. [Third priority]
```

### Critique Facilitation Rules

1. Designer presents context and asks specific feedback questions
2. Critiquers observe silently first
3. Start with "I like" before "I wish"
4. Be specific—point to exact elements
5. Focus on user impact, not personal preference
6. Designer stays silent during critique (no defending)
7. Designer summarizes what they heard
8. Designer decides what to act on

---

## Stakeholder Map

**Purpose**: Understand the ecosystem of people affected by your solution.

### Template

```
STAKEHOLDER MAP: [Project/Solution Name]

                           HIGH INFLUENCE
                                │
            ┌───────────────────┼───────────────────┐
            │                   │                   │
            │   KEEP SATISFIED  │   MANAGE CLOSELY  │
            │                   │                   │
            │   [Stakeholder]   │   [Stakeholder]   │
            │   [Stakeholder]   │   [Stakeholder]   │
            │                   │                   │
LOW         ├───────────────────┼───────────────────┤         HIGH
INTEREST    │                   │                   │         INTEREST
            │   MONITOR         │   KEEP INFORMED   │
            │                   │                   │
            │   [Stakeholder]   │   [Stakeholder]   │
            │   [Stakeholder]   │   [Stakeholder]   │
            │                   │                   │
            └───────────────────┼───────────────────┘
                                │
                           LOW INFLUENCE

STAKEHOLDER DETAILS:

[High-priority stakeholder]:
- Interest: [What they care about]
- Influence: [How they can help/block]
- Engagement strategy: [How to involve them]

[Next stakeholder]:
- Interest: [What they care about]
- Influence: [How they can help/block]
- Engagement strategy: [How to involve them]
```

---

## Affinity Diagramming

**Purpose**: Organize large amounts of qualitative data into themes.

### Process

```
AFFINITY DIAGRAM SESSION

INPUT DATA:
- [X] interview quotes
- [X] observation notes
- [X] survey responses
- [X] other data points

STEP 1: TRANSFER TO STICKY NOTES
- One insight per sticky note
- Use participant's words when possible
- Include source reference

STEP 2: SILENT CLUSTERING
- No talking
- Move sticky notes into groups that feel related
- Anyone can move any note
- Groups will form organically

STEP 3: NAME THE CLUSTERS
- What theme connects this group?
- Write theme on header sticky note
- Should be a short phrase, not a word

STEP 4: ARRANGE HIERARCHY
- Are some themes related?
- Create super-clusters if needed
- Note outliers that don't fit

RESULTING THEMES:
1. [Theme] - [X notes]
   Key insight: [Synthesis]
   
2. [Theme] - [X notes]
   Key insight: [Synthesis]
   
3. [Theme] - [X notes]
   Key insight: [Synthesis]

OUTLIERS TO INVESTIGATE:
- [Note that doesn't fit]
- [Note that doesn't fit]
```

---

## Rapid Experimentation Framework

**Purpose**: Structure quick tests of risky assumptions.

### Experiment Card

```
EXPERIMENT CARD

EXPERIMENT NAME: [Descriptive name]

HYPOTHESIS:
We believe [user segment] will [behavior] 
because [reason/insight].

RISKIEST ASSUMPTION:
[The thing that must be true for this to work]

EXPERIMENT DESIGN:
- Type: [Landing page / Concierge / A-B test / Interview / etc.]
- Sample: [Who, how many]
- Duration: [How long]
- Metric: [What we'll measure]

SUCCESS CRITERIA:
- Minimum: [X% / X users / X actions] = Worth continuing
- Target: [X% / X users / X actions] = Strong signal

EXPERIMENT SETUP:
[What needs to be built/created]

DATA COLLECTION:
[How we'll gather and track results]

DECISION RULES:
- If metric > target: [Action]
- If metric > minimum but < target: [Action]
- If metric < minimum: [Action]

RESULTS:
- Metric achieved: [Result]
- Decision: [Proceed / Iterate / Pivot / Kill]
- Key learning: [What we now know]
```

---

## Storyboarding

**Purpose**: Visualize the user experience as a narrative sequence.

### Storyboard Template

```
STORYBOARD: [Concept Name]

CHARACTER: [User/persona]
SCENARIO: [What they're trying to accomplish]

┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│  FRAME 1    │  FRAME 2    │  FRAME 3    │  FRAME 4    │  FRAME 5    │
│             │             │             │             │             │
│  [Sketch]   │  [Sketch]   │  [Sketch]   │  [Sketch]   │  [Sketch]   │
│             │             │             │             │             │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ SETTING:    │ ACTION:     │ ACTION:     │ ACTION:     │ OUTCOME:    │
│ [Context]   │ [What       │ [What       │ [What       │ [Resolution]│
│             │ happens]    │ happens]    │ happens]    │             │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Emotion:    │ Emotion:    │ Emotion:    │ Emotion:    │ Emotion:    │
│ [Feeling]   │ [Feeling]   │ [Feeling]   │ [Feeling]   │ [Feeling]   │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘

NARRATIVE:
[One paragraph describing the full story]

KEY MOMENT:
Frame [X] is the critical moment because [reason].

QUESTIONS THIS RAISES:
1. [Question for prototyping/testing]
2. [Question for prototyping/testing]
```
