# Cursor Rules: A Practical Guide

> What we learned about `.mdc` files, subdirectory scoping, and team collaboration.

---

## TL;DR

- Rules in `.cursor/rules/` at **project root** = always apply
- Rules in `subfolder/.cursor/rules/` = auto-attach when editing files in that subfolder
- **Don't** put subfolders inside `.cursor/rules/` for organization — they break scoping

---

## File Locations

### Rules Files Examples (`.mdc`)

```
project/
├── .cursor/rules/              # Global rules (always active)
│   ├── project-context.mdc
│   └── coding-standards.mdc
├── backend/
│   └── .cursor/rules/          # Backend-specific (auto-attaches for backend/ files)
│       └── api-guidelines.mdc
├── frontend/
│   └── .cursor/rules/          # Frontend-specific
│       └── component-rules.mdc
└── docs/
    └── .cursor/rules/          # Docs-specific
        └── writing-style.mdc
```

---

## How Auto-Attachment Works

When you open/edit a file, Cursor:

1. Loads all rules from project root `.cursor/rules/`
2. Scans upward from the file's directory for any `.cursor/rules/` folders
3. Auto-attaches rules from matching subdirectory rule folders

### Example

Editing `backend/api/users.ts`:
- ✅ Loads `/.cursor/rules/*` (global)
- ✅ Loads `/backend/.cursor/rules/*` (auto-attached)
- ❌ Does NOT load `/frontend/.cursor/rules/*` (different subtree)

---

## What Works

### ✅ Subdirectory-Scoped Rules

Put `.cursor/rules/` inside any code directory to scope rules to that area:

```
frontend/.cursor/rules/react-patterns.mdc
```

This rule only activates when editing files inside `frontend/`.

### ✅ Global Always-Apply Rules

Rules at project root with `alwaysApply: true`:

```yaml
---
alwaysApply: true
---
# My Rule
Content here...
```

### ✅ Agent-Requested Rules

Set `alwaysApply: false` and the AI can request them when relevant:

```yaml
---
alwaysApply: false
description: "Database migration patterns"
---
```

### ✅ Glob Patterns in Rules

Target specific file types (globs are relative to workspace root):

```yaml
---
globs: ["**/*.tsx", "**/*.jsx"]
---
```

---

## What Doesn't Work

### ❌ Subfolders Inside `.cursor/rules/`

**Broken:**
```
.cursor/rules/
├── shared/
│   └── my-rule.mdc      # Only triggers for files IN .cursor/rules/shared/
└── personal/
    └── prefs.mdc        # Only triggers for files IN .cursor/rules/personal/
```

These rules will **never activate** because you don't edit files inside `.cursor/rules/`.

**Correct approach:** Keep all rules flat at `.cursor/rules/` root, or use code directory scoping.

### ❌ Globs with Spaces/Commas

Complex glob patterns can fail silently. Stick to simple patterns.

### ❌ Multi-Root Workspaces

Rules may not resolve correctly across multiple workspace roots.

### ❌ Automatic Rule Inheritance

Child directories don't automatically inherit parent rules — Cursor scans upward but doesn't merge. You may need to duplicate rules or use glob targeting.

---

## Team/Shared Environment Tips

### Git-Tracked Rules (Shared)

Commit these to version control:
```
.cursor/rules/
├── project-context.mdc     # Product brief, team conventions
├── coding-standards.mdc    # Linting, naming, architecture
└── api-patterns.mdc        # Shared API design rules
```

### Git-Ignored Rules (Personal)

Add to `.gitignore`:
```gitignore
# Personal Cursor preferences
.cursor/rules/personal-*.mdc
```

Then each developer can have:
```
.cursor/rules/personal-john.mdc   # John's preferences (ignored)
.cursor/rules/personal-jane.mdc   # Jane's preferences (ignored)
```

### Rule File Naming Convention

Use prefixes for load order and clarity:
```
.cursor/rules/
├── 00-meta.mdc              # How to write rules
├── 01-project-context.mdc   # Product/business context
├── 02-architecture.mdc      # Technical architecture
├── 03-coding-standards.mdc  # Code style
└── 99-experimental.mdc      # Testing new rules
```

---

## MDC File Structure

```yaml
---
alwaysApply: true
description: "Brief description shown in Cursor UI"
globs: ["**/*.ts"]  # Optional: file targeting
---

# Rule Title

## Section

- Bullet points
- For guidelines

## Code Examples

```language
code here
```
```

### Frontmatter Options

| Field | Type | Description |
|-------|------|-------------|
| `alwaysApply` | boolean | `true` = always load, `false` = on-demand |
| `description` | string | Shows in Cursor's rules panel |
| `globs` | string[] | File patterns to target |

---

## Debugging Rules

### Check What Rules Are Loaded

In any chat, ask:
> "What Cursor rules do you currently see?"

The AI will list attached rules at the bottom of file reads.

### Verify Subdirectory Attachment

1. Create a test rule in `subfolder/.cursor/rules/test.mdc`
2. Edit any file in `subfolder/`
3. Check if the rule appears in the AI's context

### Common Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Rule never loads | In subfolder of `.cursor/rules/` | Move to root level |
| Rule loads everywhere | `alwaysApply: true` at root | Use subdirectory scoping or globs |
| Rule missing for some files | Glob pattern mismatch | Check glob syntax |
| Stale rules | Cursor cache | Restart Cursor |

---

## Resources

- [Cursor Docs: Rules](https://docs.cursor.com/context/rules)
- [Forum: Subdirectory Rules](https://forum.cursor.com/t/nested-cursor-rules-subdirectories/110303)
- [Forum: Glob Inconsistencies](https://forum.cursor.com/t/cursor-rules-globs-inconsistencies/116958)

---

*Last updated: January 2026*
