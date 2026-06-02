# Expected Behavior

- Explain deployment in one step at a time when the user is inexperienced.
- Separate code hosting, app hosting, model API, and environment variables clearly.
- Never request or expose real API keys.
- Confirm `PORT` and `0.0.0.0` binding for cloud-hosted Node services.
- Verify production with the public URL and health endpoint before claiming success.
- If provider requirements conflict with the current implementation, say so plainly and propose the smallest honest path.
- When a repeated failure appears, log it with `Pattern-Key` and update recurrence instead of treating it as a one-off.
- Only update `SKILL.md` after a proposal is reviewed and these scenarios still pass.

