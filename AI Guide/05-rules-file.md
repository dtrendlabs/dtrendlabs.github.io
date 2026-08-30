# Rules File
### AppStore/PlayStore App Distribution & Development Company Website

This document consolidates every "rules" artifact the site needs: crawler rules (`robots.txt`), AI-agent/bot rules, brand/content rules, and internal development rules. Keep these versioned alongside the codebase.

---

## 1. `robots.txt` (crawler rules)

Location: `https://dtrendlabs.github.io//robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /client-portal/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /*?preview=
Disallow: /404
Disallow: /500

Sitemap: https://dtrendlabs.github.io/sitemap.xml
```

**Notes:**
- Never disallow `/apps/`, `/services/`, `/blog/`, `/work/` — these drive both SEO and store-listing discovery.
- Disallow the client portal, admin, and any preview/staging query params to avoid indexing private or duplicate content.
- Keep a separate, stricter `robots.txt` on the staging subdomain (`Disallow: /` entirely) plus HTTP basic auth.

## 2. AI Crawler / Bot Rules

As of 2025–2026, many sites explicitly allow or disallow AI training/answer-engine crawlers. Decide policy per bot and document the reasoning (visibility in AI answers vs. protecting original content from training).

```txt
# Answer-engine bots (recommended: allow, drives discovery via AI search)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

# Aggressive/low-value scrapers (recommended: disallow)
User-agent: CCBot
Disallow: /
```

- Re-evaluate this list periodically — new crawlers appear; check each vendor's published user-agent and current guidance before deploying.
- This complements, but does not replace, `/llms.txt` (see file 04) — `robots.txt` controls *access*, `llms.txt` curates *what to read first*.

## 3. Sitemap Rules

- `sitemap.xml` auto-generated at build time from the CMS; split into sub-sitemaps if the app/blog catalog grows large:
  - `/sitemap-pages.xml`
  - `/sitemap-apps.xml`
  - `/sitemap-blog.xml`
  - `/sitemap-work.xml`
- Every URL includes `<lastmod>`; app and blog sitemaps update automatically on publish.
- Exclude `/client-portal/*`, `/404`, `/500`, and any `noindex` pages from the sitemap entirely.

## 4. Content & Brand Rules

1. **Naming**: Always refer to the company by its registered/trademarked name consistently (no unauthorized abbreviations in headlines).
2. **App claims**: Never state install counts, ratings, or rankings that aren't currently verifiable from App Store Connect / Google Play Console — sync these fields from the live API rather than hardcoding.
3. **Screenshots**: All app screenshots shown on the site must reflect the **current published version** of the app; update within 48 hours of any UI-changing release.
4. **Client work**: Never publish a client case study, logo, or testimonial without written sign-off; keep signed releases on file.
5. **Pricing accuracy**: Pricing shown on `/pricing` must always match what's actually charged at checkout/App Store Connect/Play Console — mismatches are both a UX and legal risk (misleading pricing).
6. **Tone**: Confident, plain-language, no unexplained jargon; every technical term (e.g., "ASO," "MVP") gets a plain-English gloss on first use per page.
7. **Imagery**: No stock photography of generic "person smiling at phone" — use real product shots, real device frames, real team photos.
8. **Accessibility of claims**: Any performance/results claim ("2x more installs") must have a footnote or linked case study substantiating it.

## 5. Store Compliance Rules (Apple & Google policy alignment)

- Every owned app's marketing page must link to a **privacy policy URL** matching exactly what's registered in App Store Connect / Play Console — required for store approval.
- Do not use Apple or Google trademarks/logos in a way that implies endorsement; use only the official "Download on the App Store" / "Get it on Google Play" badge assets per each platform's brand guidelines, unmodified.
- Do not advertise features, IAPs, or subscription terms on the website that differ from what's declared in the app's store listing — both platforms actively enforce consistency and will reject/pull apps for mismatches.
- If linking directly to APK downloads (Android sideloading), display a clear warning about enabling "install from unknown sources" and provide the SHA-256 checksum (see Security file, §3.3).

## 6. Development / Engineering Rules

1. **Branching**: `main` is always deployable; feature branches off `main`, merged via PR with at least one review and passing CI (lint, type-check, tests, Lighthouse budget check).
2. **Commit style**: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) for automated changelog generation.
3. **No secrets in repo**: enforced via pre-commit hook (gitleaks) and CI secret-scanning.
4. **Design tokens as source of truth**: colors, spacing, type scale defined once (CSS variables / Tailwind config) — no hardcoded hex values in components.
5. **Component-driven development**: every UI element built and reviewed in isolation (Storybook) before integration into a page.
6. **Accessibility gate**: axe-core automated checks run in CI; PRs that introduce new a11y violations are blocked.
7. **Performance gate**: Lighthouse CI runs on every PR against the budget in file 03 (§4.7); regressions beyond a defined threshold block merge.
8. **Content changes** (app listings, pricing, blog) go through the CMS, not direct code edits — keeps non-engineers self-sufficient and reduces deploy risk.
9. **Feature flags** for any risky or partially-rolled-out feature (e.g., new pricing page) rather than long-lived branches.
10. **Rollback plan**: every deploy must be one-click revertible (immutable deployments via the hosting platform, e.g., Vercel/Netlify instant rollback).

## 7. Legal & Governance Rules Cross-Reference

- Privacy Policy, Terms of Service, Cookie Policy, MSA — see `/legal/*` (defined in file 03, §2.13).
- Responsible disclosure — `/.well-known/security.txt` (see file 02, §6).
- Data handling — see file 02, §4 (Data Protection & Privacy).

## 8. File Governance

| File | Owner | Review Cadence |
|---|---|---|
| `robots.txt` | Engineering Lead | On any new crawler/bot guidance or site structure change |
| `llms.txt` | Marketing + Engineering | Monthly, or on any pricing/app-lineup change |
| `sitemap.xml` | Auto-generated | Every deploy |
| Brand/content rules (this doc) | Marketing Lead | Quarterly |
| Security rules | Security/Eng Lead | Quarterly + after any incident |
