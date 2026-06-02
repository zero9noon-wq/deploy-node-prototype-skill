# Deploy Node Prototype Skill

A Codex skill for turning a local Node.js, static HTML, or lightweight web prototype into a shareable public link.

It is designed for the common path:

```text
local project -> GitHub -> Render -> public URL
```

## When To Use

Use this skill when you want Codex to help with requests like:

- "帮我正式部署这个项目"
- "我想让别人通过链接看到这个产品"
- "把这个本地原型上传到 GitHub 并部署"
- "帮我配置 Render、环境变量和 API Key"
- "检查这个 Node 项目能不能上线"

## What It Covers

The skill guides Codex through:

- inspecting a local web project before deployment
- adding deployment files such as `package.json`, `.gitignore`, `.env.example`, and `render.yaml`
- keeping API keys and `.env` files out of GitHub
- publishing code to GitHub
- deploying a Node web service on Render
- setting environment variables safely
- verifying the production URL and health endpoint

## Self-Evolving Workflow

This skill now includes a lightweight self-evolution loop:

```text
deployment work
-> log failures, corrections, and better patterns
-> detect recurring Pattern-Key entries
-> generate update proposals
-> review before editing SKILL.md
-> validate with pressure scenarios
```

The skill does not silently rewrite itself. It stores learnings in `learnings/`, proposes changes with `scripts/propose-skill-update.js`, and expects accepted updates to be checked against `evals/`.

## Install

Clone this repository into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
git clone git@github.com:zero9noon-wq/deploy-node-prototype-skill.git ~/.codex/skills/deploy-node-prototype
```

If you prefer HTTPS:

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/zero9noon-wq/deploy-node-prototype-skill.git ~/.codex/skills/deploy-node-prototype
```

To update later:

```bash
cd ~/.codex/skills/deploy-node-prototype
git pull
```

## Usage

Open Codex in the project you want to deploy, then say:

```text
用 deploy-node-prototype 帮我部署这个项目
```

Codex should then inspect the project, prepare the deployment configuration, guide GitHub setup, guide Render setup, and verify the final public link.

## Files

- `SKILL.md`: the actual Codex skill instructions
- `agents/openai.yaml`: UI metadata for Codex skill discovery
- `learnings/`: learning, error, and feature-request logs
- `evals/`: pressure scenarios and expected behavior for validating updates
- `scripts/propose-skill-update.js`: generates reviewed update proposals from recurring learnings
- `CHANGELOG.md`: accepted skill changes over time

## Safety Notes

This skill is intentionally strict about deployment safety:

- Do not commit `.env` files.
- Do not paste API keys into chat.
- Put secrets in the hosting platform's environment variables.
- Verify the deployed URL before calling the deployment complete.
