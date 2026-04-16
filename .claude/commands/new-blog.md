---
description: Research, draft, humanize, and save a new SunFM blog post as MDX
---

# /new-blog

Use this command to research and write a new blog post for sunfm.fitness. Posts live as MDX files in `src/content/blog/<category>/<slug>.mdx` and are rendered at `/<category>/<slug>` via the `[category]/[slug]/page.tsx` route.

Categories (already in use): `training`, `nutrition`, `wellness`.

## What to do if the user gives you a topic

If the user hands you a specific topic or keyword ("write about sleep for muscle recovery"), skip research and jump to Step 2, but still do the SERP reconnaissance in Step 2 so the outline beats what's ranking.

If the user gives you no topic ("pick the best next post"), run the full research flow from Step 1.

---

## Step 1 — Research the best next topic

Goal: pick a topic with real search intent that complements existing content and converts into the Movement Screen tool or the consultation.

### 1a. Audit what's already published

Launch an Explore subagent and ask it to:
- Read every MDX file under `src/content/blog/`
- For each, note: title, target keywords (from frontmatter + headings), primary angle, rough word count, internal linking patterns
- Identify topic gaps — areas the business's positioning (mobility, strength for longevity, desk workers 30+, Bay Area) could cover but hasn't
- Note the frontmatter format for new posts

Keep the audit under 400 words.

### 1b. SEO keyword + SERP research

Launch a general-purpose subagent with WebSearch access. Give it:
- Business positioning (San Jose personal trainer, mobility focus, Movement Screen tool at `/tools/movement-screen` is the primary conversion asset)
- The gap list from 1a
- 6–10 candidate topics to evaluate

Tell it to WebSearch each candidate and report:
- The actual top-ranking URLs
- Quality of ranking content (weak = opportunity, strong = skip)
- Search intent (informational/commercial)
- PAA / related questions if visible
- Recommend ONE topic with: title, primary keyword, 2–3 secondary keywords, why it wins on volume + competition + commercial fit + Movement Screen synergy, a 6–8 H2 outline that would genuinely outrank the current results, and internal linking plan

Evaluation criteria for the winner:
1. Search intent naturally funnels into personal training OR the Movement Screen tool
2. Current top results are weak (listicles, no scoring, no follow-up program, outdated)
3. Doesn't overlap existing posts
4. Reinforces mobility / movement / strength-for-longevity positioning
5. National reach fine; Bay Area / San Jose angle if it fits naturally

Bias toward topics where the Movement Screen is a perfect next step — e.g. anything shaped like "test your X at home" or "how to tell if your X is tight."

### 1c. Confirm with user

Present the recommended topic (title + primary keyword + why it wins + rough outline). If the user wants a different angle, iterate. Don't draft until they sign off.

---

## Step 2 — Draft the post

Match the voice of existing posts. Read `src/content/blog/training/functional-movement-exercises-for-desk-workers.mdx` as the canonical voice reference before drafting.

### Voice rules (Jeffrey Sun)

- First person, conversational, plainspoken
- Anchors in real practice: "I've trained hundreds of desk workers in San Jose", specific client anecdotes (no names), specific numbers (12,000 sessions, "two or three weeks")
- Short paragraphs (2–4 sentences)
- Specific concrete details over vague claims ("2 PM backache" not "chronic discomfort")
- Opinionated, not neutral — takes positions like "five minutes of stretching isn't going to undo this"
- No AI tells: no "it's worth noting", "in conclusion", "game-changer", "elevate", "navigate", "robust", "leverage", "delve", "tapestry", "landscape" (figurative), "unlock"
- Minimal em dashes — prefer commas or periods
- Vary sentence rhythm: mix short punchy with longer flowing
- No Rule-of-Three lists when a pair or a single item would do
- No "not X, but Y" negative parallelism unless it's doing real work
- No "-ing tail" phrases ("highlighting its role...", "reflecting the community's...")

### Frontmatter

```yaml
---
title: "Concrete Title With Target Keyword"
description: "1–2 sentence hook that includes a secondary keyword and ends with Bay Area / San Jose credibility when it fits naturally."
category: "training" # or nutrition, wellness
date: "YYYY-MM-DD" # today
author: "Jeffrey Sun"
image: "/images/blog/<filename>.jpg"
tags: ["primary keyword", "secondary keyword", "desk workers", "San Jose", "mobility", "..."] # 5–7 tags
---
```

### Structure

- 1,800–2,500 words typically. Go longer only if the topic demands it.
- Opening hook: a specific problem, not a generic preamble. Don't signpost ("in this post we will...").
- 6–8 H2 sections matching the outline from Step 1. Use sentence case, not title case.
- H3s only when genuinely needed inside an H2.
- Bold inline labels (**Pass**:, **Fail**:) are fine when they carry information. Avoid decorative bolding.
- Close with a section that nudges toward the Movement Screen tool AND the consultation, without it reading like an ad.

### Image embedding

Available stock images in `public/images/blog/`:
- `barbell-compound-lift.jpg`
- `desk-worker-exercises.jpg`
- `functional-workout.jpg`
- `gym-workout-strength.jpg`
- `healthy-food-prep.jpg`
- `kettlebell-training.jpg`
- `meal-prep-containers.jpg`
- `meal-prep-professionals.jpg`
- `personal-trainer-session.jpg`
- `personal-training-stress.jpg`
- `strength-training-longevity.jpg`
- `stretching-mobility.jpg`

Rules:
- Use one image as the `image:` frontmatter field (the hero, rendered by the post page)
- Embed 1–2 additional images inline with `![alt](/images/blog/filename.jpg)` at natural section breaks
- If none of the stock images fits the topic, check memory — the user prefers downloading from Unsplash CDN when creating blog posts rather than asking them to find images. Save new images to `public/images/blog/<descriptive-slug>.jpg`.
- Alt text should be specific and descriptive, not keyword-stuffed

### YouTube embedding

The MDX renderer supports `<YouTube id="..." title="..." />`. Existing posts embed demonstration videos for each exercise.

**Important:** Do not invent YouTube IDs. Either:
1. Ask the user for video URLs for each exercise, extract the IDs, and embed them
2. Skip YouTube embeds and note in the completion summary that the user should add them

Do NOT pass off made-up IDs as real videos. The IDs used in `functional-movement-exercises-for-desk-workers.mdx` are Jeffrey's chosen demonstrations — if you need similar videos for a new post, the user must supply them.

---

## Step 3 — Humanize

Invoke the `humanizer` skill on the draft body. Apply fixes directly to the file. Per memory, the user wants /humanizer run on all customer-facing prose before committing.

The humanizer pass should include the final anti-AI audit:
1. Produce draft rewrite
2. Ask "what makes this obviously AI-generated?" and answer honestly
3. Revise once more into final form

---

## Step 4 — Internal linking (conservative)

The user's guidance: "splash one or two every now and then — don't be too crazy."

From the new post OUT:
- Link to `/tools/movement-screen` once, naturally, in a "what to do next" or conversion context
- Link to `/#apply` once in the closing paragraph for 1:1 training
- Link to 1–2 existing posts where context genuinely calls for it (use `[text](/training/<slug>)` etc.)

Into the new post (update existing posts):
- Pick the single most relevant existing post where a reader would genuinely benefit from the new post
- Add ONE inline link, in prose, at a natural anchor — not a "related posts" block
- Do not add links to existing posts that are already link-dense
- Do not link from the homepage or the movement-screen tool page — those are self-contained

Run `npx tsc --noEmit` after edits to make sure nothing broke.

---

## Step 5 — Save and report

Write the final MDX to:
```
src/content/blog/<category>/<slug>.mdx
```

Report to the user:
- File path + final URL (`https://www.sunfm.fitness/<category>/<slug>`)
- Word count
- Target primary keyword and why you picked this topic
- Which existing post(s) got a link back to the new one
- Any missing pieces the user needs to fill in (YouTube IDs, new images, etc.)
- Offer to commit and push

Do NOT commit or push unless the user asks. The user will usually want to review first.

---

## Notes

- The blog route is `/<category>/<slug>`, NOT `/blog/<category>/<slug>`. The `category` in frontmatter must match the directory name.
- Tags are free-form; there's no enumerated list, but reuse tags from existing posts when they apply to keep the taxonomy coherent.
- Existing post slugs are descriptive kebab-case (e.g., `strength-training-for-longevity-beginners-guide-over-30`, not `strength-training`). Match that density — lean toward full descriptive slugs over short ones because they're good for SEO.
- If a topic overlaps an existing post by more than ~30%, push back and suggest a narrower angle instead.
- Per memory: never ask the user to source images — download from Unsplash CDN yourself if needed.
