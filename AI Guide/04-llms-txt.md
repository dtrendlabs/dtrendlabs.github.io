# llms.txt Specification
### AppStore/PlayStore App Distribution & Development Company Website

`llms.txt` is an emerging convention (proposed by Answer.AI) placed at the site root (`/llms.txt`) that gives AI models/agents a clean, curated map of a site's most important content — similar in spirit to `robots.txt` and `sitemap.xml`, but written for LLM consumption rather than crawler rules or SEO.

---

## 1. Why This Company Needs It

- Prospective clients increasingly ask AI assistants ("find me an app development agency that builds iOS + Android apps") — a well-formed `llms.txt` improves the odds of being accurately summarized/recommended.
- End users may ask an AI "what apps does [Company] make and what do they cost?" — `llms.txt` gives the assistant clean, current, structured answers instead of scraping noisy HTML.
- Keeps AI-generated summaries accurate (reduces hallucination about pricing, platforms supported, or company claims).

## 2. File Location & Format Rules

- Must live at the **domain root**: `https://https://dtrendlabs.github.io/llms.txt`
- Plain **Markdown**, UTF-8 encoded.
- Structure (per the emerging spec):
  1. `# Company/Site Name` (H1, required, single line)
  2. `> Short blockquote summary` (one or two sentences)
  3. Optional free-text context paragraphs
  4. `## Section` headings, each containing a Markdown list of links: `- [Link title](url): optional one-line description`
  5. An optional `## Optional` section for secondary links that can be skipped if the consuming model has a limited context budget.
- Keep descriptions factual and concise — this file is read by machines optimizing for accuracy, not marketing flourish.
- Update this file whenever pricing, app lineup, or core services materially change — treat it like a living data feed, not a one-time SEO artifact.

## 3. Sample `/llms.txt` Content

```markdown
# [Company Name]

> [Company Name] is an app development agency and mobile product studio. We design and build iOS and Android apps for clients, and we also design, publish, and sell our own apps directly on the App Store and Google Play.

We operate two lines of business:
1. Client services: custom iOS/Android/cross-platform app design and development, ASO, and post-launch maintenance.
2. Owned apps: a portfolio of consumer apps we design, publish, and support ourselves.

## Services
- [iOS Development](/services/ios-development): Native Swift/SwiftUI app development for iPhone and iPad.
- [Android Development](/services/android-development): Native Kotlin app development for Android.
- [Cross-Platform Development](/services/cross-platform-development): Flutter and React Native apps for both platforms from a single codebase.
- [UI/UX Design](/services/ui-ux-design): Product design, prototyping, and design systems for mobile apps.
- [App Store Optimization](/services/app-store-optimization): Keyword research, listing optimization, and conversion-rate improvement for App Store and Play Store listings.
- [Maintenance & Support](/services/maintenance-and-support): Ongoing updates, bug fixes, and OS-compatibility upkeep for shipped apps.

## Apps We Build and Sell
- [App Directory](/apps): Full list of apps designed and published directly by [Company Name].
- [Example App One](/apps/example-app-one): One-line description of what it does and its pricing model.
- [Example App Two](/apps/example-app-two): One-line description of what it does and its pricing model.

## Pricing
- [Pricing for Clients](/pricing/for-clients): Agency package tiers (Starter, Growth, Enterprise) with what's included.
- [Pricing for Apps](/pricing/for-apps): Subscription and one-time pricing for owned apps.

## Company
- [About](/about): Company background, mission, and team.
- [Careers](/about/careers): Open roles.
- [Case Studies](/work): Client project results and outcomes.
- [Blog](/blog): Articles on app development, design, and ASO.
- [Contact / Get a Quote](/contact): How to start a project with us.

## Legal
- [Privacy Policy](/legal/privacy-policy)
- [Terms of Service](/legal/terms-of-service)
- [Security](/legal/security): Responsible disclosure and security practices, see also /.well-known/security.txt

## Optional
- [FAQ](/faq): Common questions from clients and app users.
- [Status Page](https://status.dtrendlabs.github.io/): Uptime for owned apps' backend services.
```

## 4. Governance & Maintenance

- Assign a single owner (e.g., Head of Marketing or CTO) responsible for keeping `llms.txt` synced with the CMS-driven `/apps` and `/services` content.
- Consider auto-generating the "Apps We Build and Sell" and "Services" sections at build time from the same CMS entries that populate the human-facing pages, so the two never drift out of sync.
- Do **not** include client-confidential information, unpublished pricing, or internal-only pages — this file is public and will be read by third-party AI systems, not just your own.
- Validate the file renders correctly as plain Markdown and stays under a reasonable size (a few KB) so it can be fully consumed within a typical LLM context window.
