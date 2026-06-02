---
name: deploy-node-prototype
description: Use when a user wants to turn a local Node.js, static HTML, or lightweight web prototype into a shareable public link, especially through GitHub plus Render, Railway, or another Node web service host; also use when the user is unfamiliar with GitHub, deployment, environment variables, API keys, or production verification.
---

# Deploy Node Prototype

## Overview

Help the user move from "runs on my computer" to "others can open a public URL" with minimal jargon. Prefer GitHub as the code source and Render as the default host for small Node/static prototypes unless the user already chose another provider.

This skill is self-evolving: it captures deployment failures, user corrections, provider changes, and better verification patterns, then promotes repeated lessons into update proposals after validation.

## Core Flow

1. Inspect the project first.
   - Identify the app entrypoint, runtime, public files, and whether a backend is required.
   - Check for secrets in `.env`, source files, screenshots, or docs before staging.
   - For Node apps, ensure a `package.json` exists with `start` and, if useful, `check`.
   - Ensure the server listens on `process.env.PORT` and `0.0.0.0` for cloud hosting.

2. Prepare deployment files.
   - Add `.gitignore` for `.env`, `.env.*`, `node_modules/`, logs, OS files, and generated local artifacts.
   - Add `.env.example` with placeholder values only.
   - For Render, add `render.yaml` when the project is simple enough:

```yaml
services:
  - type: web
    name: app-name
    runtime: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: API_KEY_NAME
        sync: false
```

3. Verify locally before upload.
   - Run syntax/build checks available in the repo.
   - Start the app on a temporary port.
   - Check the homepage and health endpoint if one exists.
   - Stop temporary servers before finishing.

4. Publish to GitHub.
   - If no repo exists, guide the user to create an empty GitHub repository.
   - Do not ask the user to paste API keys or `.env` contents.
   - Initialize git if needed, stage only intentional files, commit, set `main`, and add the remote.
   - Prefer SSH when HTTPS credentials fail. If needed, create an SSH key, copy the public key to clipboard, and guide the user to GitHub SSH settings.
   - Verify with `ssh -T git@github.com` before pushing.

5. Deploy on Render.
   - Guide the user through New Web Service, connecting the GitHub repo, keeping root directory empty unless the app is in a subfolder.
   - Use `npm install` for Build Command and `npm start` for Start Command.
   - Put secrets in Render Environment Variables, not in GitHub.
   - Explain free-tier cold starts plainly: first visit after inactivity can be slow.

6. Verify production.
   - Open the public URL.
   - Check `/api/health` or equivalent when present.
   - Confirm API-backed features actually hit the backend, not just local fallback.
   - Give the user the public link and one sentence explaining how future updates work.

## Self-Evolution Loop

Before major deployment work, review `learnings/LEARNINGS.md`, `learnings/ERRORS.md`, and `learnings/FEATURE_REQUESTS.md` for unresolved high-priority entries.

After deployment work, log anything that should improve future runs:

- User corrections about the deployment flow, wording, or provider choice.
- Repeated failures with GitHub, Render, Railway, Alibaba Cloud, environment variables, Node versions, port binding, or API-key configuration.
- New provider behavior, UI changes, or verification steps.
- Better prompts, checklists, or commands that reduced confusion.

Promote a learning only when it is recurring or high impact:

1. Add or update a learning entry with a stable `Pattern-Key`.
2. If the same `Pattern-Key` reaches `Recurrence-Count >= 3`, run `node scripts/propose-skill-update.js`.
3. Review the generated proposal before editing `SKILL.md`; do not silently change the skill.
4. Validate changes against `evals/pressure-scenarios.md` and `evals/expected-behavior.md`.
5. Record accepted changes in `CHANGELOG.md`.

## User Guidance Style

Use one step at a time when the user says they do not know how. Ask them to report what they see or send screenshots. Avoid explaining all of Git or deployment up front; explain each concept only when it becomes relevant.

Use simple mental models:

- GitHub stores the code.
- Render runs the code.
- Environment variables hold secrets and runtime config.
- README is the project instruction sheet.

## Safety Rules

- Never print, request, or commit API keys.
- Never include local `.env` content in answers, screenshots, commits, or examples.
- Do not use `git add -A` when the folder contains generated screenshots, local artifacts, or unknown files; stage explicit paths.
- Do not overwrite existing remotes or history without checking current state.
- Do not claim deployment is working until a public URL or health endpoint has been freshly verified.

## Useful Commands

```bash
node --check server.js
PORT=4182 node server.js
curl -s http://localhost:4182/api/health
git init
git add index.html server.js package.json render.yaml README.md .gitignore .env.example tests
git commit -m "Prepare production deployment"
git branch -M main
git remote add origin git@github.com:USER/REPO.git
git push -u origin main
```

Use the exact file list only after inspecting the project. Adjust commands to the real entrypoint, test files, and deployment provider.
