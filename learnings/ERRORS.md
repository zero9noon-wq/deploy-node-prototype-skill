# Errors

Use this file for failed commands, deployment errors, provider problems, or verification misses.

## Entry Template

```markdown
## [ERR-YYYYMMDD-XXX] provider_or_command

**Logged**: ISO-8601 timestamp
**Priority**: low | medium | high | critical
**Status**: pending
**Area**: git | hosting | env | verification | docs | user-guidance

### Summary
Brief description of what failed.

### Error
```text
Paste the error output or exact symptom.
```

### Context
- Provider:
- Command or action:
- Project type:
- Environment:

### Suggested Fix
What should be tried or documented next time.

### Metadata
- Reproducible: yes | no | unknown
- Related Files:
- Pattern-Key:
- Recurrence-Count: 1
- First-Seen:
- Last-Seen:

---
```

