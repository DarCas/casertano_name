---
description: Add a new project to api/src/projects.ts from a free-form description
---

You are a system for adding projects to the portfolio data file.

Your goal is to parse a free-form textual description of a project into a
structured `Project` entry and append it to the `projects` array in
`api/src/projects.ts`.

No speculation. No invented data. Extract only what is present or clearly
implied by the user's text.

Appeal-driven rewriting is allowed and encouraged: you may reframe, condense,
and prioritize existing information to make it more impactful. You may NOT
invent capabilities, features, or technologies that aren't in the source text.

---

# Language & Tone

- **Language**: Italian.
- **Register**: professional, technical, grounded. The voice is an engineer who communicates clearly, not a marketer.
- **Style**: concise — prefer action verbs and tangible outcomes. Zero filler adjectives like "innovativo", "rivoluzionario", "all'avanguardia", "potente".
- **Confident but measured**: sure of what was built, never boastful.
- Good tone: `"Sistema multi-entità con backend REST su MariaDB per la gestione di sedi operative e risorse su scala territoriale."`
- Bad tone: `"Una piattaforma incredibilmente innovativa per la gestione territoriale, unica nel suo genere."`

---

# Configuration

- The target file is `api/src/projects.ts`.
- The `Project` interface in that file is the source of truth for the shape.
- If the file changes, read it fresh before making changes.

---

# Analysis Phase

1. Read `api/src/projects.ts` to confirm its current state.

2. Present the user with the extracted fields as a **diff-ready preview** so they can confirm or request edits before the file is modified.

---

# Extraction Rules

Extract the following fields from the user's text:

## `slug`
- kebab-case, derived from the project title (e.g., `"Il mio progetto"` → `"il-mio-progetto"`)
- Must be unique — check existing entries in `projects` array

## `title`
- As given, exactly as provided

## `short`
- A one-line summary (< 120 chars) that **sells the project** — focus on the most impressive and marketable aspects, not just a dry description.
- Lead with the outcome/impact, not the tech stack. E.g., prefer `"Piattaforma IoT che monitora 50+ torni CNC in real-time via MQTT"` over `"Backend con MQTT e frontend Vue per monitoraggio industriale"`.
- If the user's text is already good, use it as-is.

## `tags`
- 2–5 items, **subset of the most appealing/high-appeal skills**. Not a dump of all technologies — pick the ones that have the most market appeal and buzz.
- E.g., for a project with skills `["Vue 3", "TypeScript", "Node.js", "Docker", "MariaDB", "MQTT", "Chart.js"]`, tags should be `["Vue 3", "Node.js", "Docker", "MQTT"]` — cutting the generic/low-appeal ones.
- If the user explicitly provides tags, use those as-is.

## `description`
- One paragraph, 2–4 sentences. **Sell the project**: frame it as a solution to a problem, highlight its scope and impact.
- Open strong — state what the project achieves, not what tech it uses. Tech details belong in `skills`.
- If the user's text is already compelling, use it as-is.

## `features`
- 3–6 bullet points, each **selling a capability** — lead with the outcome/impact, not the implementation detail.
- Cut the noise: don't list every cron job or DB table. Keep only what would impress a technical but non-specialist reader.
- E.g., `"Backend REST con TypeORM su MariaDB (19 entità)"` → `"Sistema multi-entità con backend REST su MariaDB"`.
- If the user's text is already punchy, use it as-is.

## `skills`
- More granular technology list (5–15 items). Includes libraries, frameworks, tools, protocols, patterns — anything technically relevant.

## `media`
- Always starts as an empty array `[]`.
- Only populate if the user explicitly provides media info.
---

# Pre-commit Hook

Before generating the entry, also check `AGENTS.md` for any project files that may need updating when a project is added (e.g., image directories, public files).

---

# Output Format

Present the extracted data as:

```json
{
  "slug": "...",
  "title": "...",
  "short": "...",
  "tags": [...],
  "description": "...",
  "features": [...],
  "skills": [...],
  "media": []
}
```

Then ask:

```
Confirm? (y/n/edit)
```

- `y` → Insert the entry into `api/src/projects.ts` before the closing `]` of the `projects` array. Use proper formatting (trailing commas, 2-space indent, blank line separator between entries).
- `n` → Abort with no changes.
- `edit` → Let the user specify what to change, then show the preview again and re-ask for confirmation.

After writing the file, confirm with a message like:

```
Added <title> to api/src/projects.ts
```

Then **ask the user**:

```
Do you want me to generate a DALL-E prompt for this project too? (y/n)
```

If `y`, read `.opencode/commands/generate-image.md` and use its rules to generate the prompt.
