# Core Functionality, Elements & Sitemap
### AppStore/PlayStore App Distribution & Development Company Website

This site serves two business lines under one brand:
- **A. Agency/Services** — building apps *for* clients (like AppsLab) → drives leads/quotes.
- **B. Direct Products** — apps the company owns and sells/distributes itself (like Niagara Launcher) → drives downloads/subscriptions.

---

## 1. Sitemap

```
<!-- /
├── /services                        (Agency: what we build for you)
│   ├── /services/ios-development
│   ├── /services/android-development
│   ├── /services/cross-platform-development   (Flutter/React Native)
│   ├── /services/ui-ux-design
│   ├── /services/app-store-optimization       (ASO)
│   ├── /services/maintenance-and-support
│   └── /services/mvp-for-startups -->
│
├── /apps                            (Product: apps we build & sell directly)
│   ├── /apps/[app-slug]              (individual app detail page, e.g. /apps/focusflow)
│   ├── /apps/[app-slug]/changelog
│   ├── /apps/[app-slug]/privacy-policy
│   └── /apps/[app-slug]/support
│
├── /work  (a.k.a. /portfolio or /case-studies)
│   └── /work/[case-study-slug]
│
├── /pricing
│   ├── /pricing/for-clients          (agency packages: Starter/Growth/Enterprise)
│   └── /pricing/for-apps             (per-app or bundle subscription pricing)
│
├── /process                         (Discover → Design → Build → Launch → Grow)
│
├── /about
│   ├── /about/team
<!-- │   └── /about/careers -->
│
<!-- ├── /blog (a.k.a. /resources)
│   ├── /blog/[post-slug]
│   └── /blog/category/[category] -->
│
├── /contact                         (quote request / get-a-demo form)
│
├── /faq
│
├── /legal
│   ├── /legal/privacy-policy
│   ├── /legal/terms-of-service
│   ├── /legal/cookie-policy
│   ├── /legal/msa                    (Master Services Agreement, for clients)
│   └── /legal/security                (points to security.txt & practices)
│
├── /apps
│   ├── /[app-slug]/home
│   ├── /[app-slug]/privacy-policy
│   ├── /[app-slug]/download
│   └── /[app-slug]/support
│
├── /404
├── /500 (maintenance/error)
├── /sitemap.xml
├── /robots.txt
├── /llms.txt
└── /.well-known/security.txt
```

---

## 2. Page-by-Page Core Functionality

### 2.1 Homepage (`/`)
**Purpose:** Instantly disambiguate the two audiences and route each to the right path.
- Hero with **dual CTA**: "Build my app" (→ /contact) and "Explore our apps" (→ /apps).
- Animated device mockup carousel cycling through 4–6 flagship apps.
- Trust bar: client logos (agency side) + App Store/Play Store rating badges (product side).
- "What we do" — 3-pillar section: *Design, Build, Grow* apps.
- Featured case study (1 large card, metrics-led: "+240% installs in 3 months").
- Featured owned apps grid (3–4 cards with live star rating + install count if available).
- Process snapshot (5-step horizontal timeline, links to `/process`).
- Testimonials marquee (mix of client quotes + end-user app reviews).
- Pricing teaser (2 cards: "Hire us" vs "Get our apps") linking to `/pricing`.
- Blog/resources preview (3 latest posts).
- Newsletter signup ("Get product & industry updates").
- Footer with full sitemap, social, store badges, legal links.

### 2.2 Services pages (`/services/*`)
- Each service page: problem statement → what's included (bullet list) → tech stack used → relevant case studies (filtered) → pricing anchor → FAQ specific to that service → CTA to request a quote.
- Sticky "Get a Quote" side CTA on scroll (desktop) / sticky bottom bar (mobile).

### 2.3 Apps directory (`/apps`)
- Filterable/sortable grid: category (Productivity, Health, Utilities, Finance…), platform (iOS/Android/Both), pricing model (Free/Freemium/Paid/Subscription).
- Search bar with instant client-side filtering.
- Each card: icon, name, one-line tagline, star rating (live-synced from App Store Connect / Google Play Developer API where possible), platform badges, price.

### 2.4 App detail page (`/apps/[slug]`)
**This is the "product page" — should feel like an actual App Store listing embedded in the site.**
- Hero: icon, name, tagline, star rating + review count, category, "Get on App Store" / "Get it on Google Play" badges (deep-linked).
- Screenshot carousel in real device frames (swipeable).
- Feature list with icons.
- "What's new" / changelog excerpt.
- Pricing/plan comparison if freemium.
- Embedded reviews (pulled or curated) with reply-from-developer capability shown.
- Related apps ("More from us").
- Support & privacy policy links (required by both stores).
- FAQ specific to the app.

### 2.5 Work / Case Studies (`/work`, `/work/[slug]`)
- Grid of case study cards: client logo, industry, one metric headline.
- Detail page structure: Challenge → Approach → Design (with before/after or Figma embeds) → Build (tech stack) → Results (metrics with animated counters) → Client testimonial → Next steps CTA.

### 2.6 Pricing (`/pricing`)
- Tabbed interface: **"For Clients"** (agency retainer/project packages: Starter, Growth, Enterprise — feature comparison table) vs **"For Our Apps"** (subscription tiers per app or an all-app bundle "Pass").
- Toggle Monthly/Yearly with animated price recalculation.
- FAQ section addressing billing, refunds, contract terms.

### 2.7 Process (`/process`)
- Step-by-step: **Discover (workshops, requirements) → Design (wireframes, UI kit, prototype) → Build (sprints, staging builds) → Launch (store submission, ASO) → Grow (analytics, iteration, support SLA)**.
- Each step: what client provides, what company delivers, typical duration, artifacts produced (Figma link, TestFlight build, etc.).

### 2.8 About (`/about`)
- Mission/story, team grid (photo, name, role, links), culture/values, careers CTA.

### 2.9 Blog/Resources (`/blog`)
- Categories: App Development, ASO & Growth, Design, Industry News, Company Updates.
- Each post: reading time, author, related posts, newsletter CTA inline.

### 2.10 Contact / Get a Quote (`/contact`)
- **Multi-step form** (reduces friction, increases completion):
  1. What do you need? (New app / Redesign / Maintenance / Not sure)
  2. Platform(s) target (iOS / Android / Both / Web+Mobile)
  3. Budget range (select ranges, not open text)
  4. Timeline
  5. Contact details + optional file upload (brief/deck)
- Progress bar, ability to go back, autosave to localStorage (production) so users don't lose input.
- Instant confirmation screen + automated email + Slack/CRM webhook notification to sales team.
- Calendar embed option (Calendly/Cal.com) to book a call directly as an alternative path.

### 2.11 Client Portal (`/client-portal/*`) — optional but recommended
- Dashboard: active project status (phase tracker matching `/process` steps), latest build download, milestones/invoices, direct messaging/comments thread with the team.
- Notifications (in-app + email) when a new build or milestone is ready.

### 2.12 FAQ (`/faq`)
- Grouped accordions: General, For Clients (agency), For Users (apps), Billing, Security/Privacy.

### 2.13 Legal pages
- Standard Privacy Policy, ToS, Cookie Policy, plus an MSA template for enterprise clients and a Security overview page linking to `security.txt`.

---

## 3. Core Site-Wide Elements

| Element | Notes |
|---|---|
| **Global Navbar** | Logo, Services, Apps, Work, Pricing, Blog, primary CTA button ("Get a Quote"), secondary link to Client Portal login |
| **Mega Menu** | Under "Services" show all sub-services with icons; under "Apps" show top 4 apps + "View all" |
| **Footer** | 4–5 columns: Company, Services, Apps, Resources, Legal + social icons + store badges + newsletter mini-form |
| **Search (Cmd+K)** | Global command palette to jump to any app, service, or blog post |
| **Cookie Consent Banner** | Bottom sheet, granular toggle, persists choice |
| **Breadcrumbs** | On all deep pages (service detail, app detail, blog post, case study) |
| **Live chat / chatbot widget** | For quick client questions, bottom-right, respects reduced-motion and doesn't block CTAs |
| **Language/region switcher** | If serving multiple markets (footer or navbar) |
| **Status page link** | For app uptime/API status, in footer |

---

## 4. Functional Requirements Summary

1. **CMS-driven content** for apps, case studies, blog, and team (headless CMS: Sanity/Contentful/Payload) so non-devs can update without a deploy.
2. **Live App Store/Play Store data sync** (via App Store Connect API / Google Play Developer Reporting API or a service like Appfigures) to auto-refresh ratings, review counts, and screenshots on app detail pages.
3. **Analytics**: privacy-respecting product analytics (Plausible/PostHog) + conversion tracking on quote form and app store badge clicks.
4. **SEO**: server-rendered/static generation (Next.js/Astro) for all public pages, per-page metadata, JSON-LD structured data (`SoftwareApplication`, `Organization`, `Review`, `FAQPage` schemas).
5. **Internationalization-ready** architecture even if launching English-only first.
6. **Responsive** from 320px to 4K, with a genuinely distinct (not just "squeezed") mobile layout for the app showcase and pricing tables.
7. **Performance targets**: Lighthouse Performance ≥ 90, LCP < 2.0s, CLS < 0.1, TTI < 3.0s on 4G.
8. **Accessibility**: WCAG 2.1 AA minimum — keyboard navigable, proper landmark regions, alt text on all app screenshots, sufficient color contrast in both themes.
