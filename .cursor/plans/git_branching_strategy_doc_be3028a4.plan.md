---
name: Git Branching Strategy Doc
overview: Create a comprehensive git branching strategy document for the Best Day Phone development team that covers sprint-based development, feature branches, hotfix workflows, and Vercel preview integration.
todos: []
---

# Git Branching Strategy for Best Day Phone

## Overview

Create a new markdown document at [`docs/git-branching-strategy.md`](docs/git-branching-strategy.md) that outlines the team's development workflow.

## Document Contents

The document will include:

### 1. Team Context

- List of team members and their roles
- Sprint cycle information (2-week sprints)
- Repository scope (web app; mobile app is separate)

### 2. Branch Structure

**Main Branches:**

- `main` - Production-ready code, protected branch
- `sprint-N` - Active sprint branch (e.g., `sprint-1`, `sprint-2`)

**Supporting Branches:**

- Feature branches (optional, for complex work)
- Hotfix branches (for urgent production fixes)

### 3. Sprint Workflow

**At Sprint Start, John Cottam (JR) will perform the following to initialize a sprint.**

- Create new sprint branch from `main`
- Configure as Vercel preview branch
- Share preview URL with team

**During Sprint:**

- Hybrid approach:
- Simple changes: commit directly to sprint branch
- Complex features: create feature branch off sprint branch (e.g., `sprint-1/login-redesign`)
- Feature branches merge back to sprint branch via lightweight PR

**At Sprint End:**

- Sprint branch merges to `main` via PR
- Lightweight peer review by JR (technical lead) or relevant domain lead
- Deploy to production

### 4. Hotfix Process

- Create `hotfix/description` branch from `main`
- Fix and test
- Merge to `main` via expedited PR
- Backport to current sprint branch to prevent conflicts

### 5. Branch Naming Conventions

- Sprint branches: `sprint-1`, `sprint-2`, etc.
- Feature branches: `sprint-N/feature-description`
- Hotfix branches: `hotfix/description`

### 6. PR Review Guidelines

- Sprint → Main: JR or domain lead review
- Feature → Sprint: Peer review by relevant team member
- Hotfix: Expedited review by JR

### 7. Vercel Configuration Notes

- Add sprint branch pattern to Vercel preview settings
- Document how to access preview URLs

### 8. Visual Workflow Diagram

Include a mermaid diagram showing the branch flow and merge patterns

### 9. Mobile App Note

Acknowledge that the mobile app (Andy's domain) lives in a separate repository with its own branching strategy

## Why This Approach

This strategy balances:

- Team collaboration via shared sprint branch
- Flexibility for complex features via optional feature branches
- Production stability via protected main branch and PR reviews
- Stakeholder visibility via Vercel preview deployments
- Emergency response capability via hotfix workflow
