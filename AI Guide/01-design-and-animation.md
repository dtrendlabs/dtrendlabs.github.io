# Design & Animation Specification
### AppStore/PlayStore App Distribution & Development Company Website

Reference inspiration: [AppsLab](https://appslab.co) (agency-style, service-led, portfolio-driven) and [Niagara Launcher](https://niagaralauncher.com) (single-product, minimal, motion-forward, App Store style presentation).

---

## 1. Design Philosophy

- **Product-first, not corporate-first.** The site should feel like an app itself — fast, tactile, alive. Every scroll should reveal something in motion.
- **Personality**: the site must serve the audiences who want to download apps the company has built and sells directly (Niagara Launcher model).
- Visual language should borrow from mobile OS conventions (iOS/Material) since the product *is* mobile apps — rounded corners, soft shadows, app-icon grids, notification-style toasts.

---

## 2. Visual System

### 2.1 Color Palette
| Token | Usage | Example |
|---|---|---|
| `--color-bg` | Base background | `#0B0B0F` (dark) / `#FAFAFC` (light) |
| `--color-surface` | Cards, panels | `#15151C` / `#FFFFFF` |
| `--color-primary` | CTA, links, active states | Gradient `#6C5CE7 → #00D2FF` |
| `--color-accent` | Highlights, badges | `#FF6B6B` |
| `--color-success` | Ratings, "Live on Store" | `#2ECC71` |
| `--color-text-primary` | Headlines | `#F5F5F7` / `#111114` |
| `--color-text-secondary` | Body copy | `#A0A0AE` / `#5B5B66` |

- Support **auto dark/light mode** with a manual toggle (persisted in `localStorage` for production; note: not usable inside Artifacts previews).
- Use a subtle animated gradient mesh in hero sections (canvas or CSS `conic-gradient` blur) — mirrors the aurora-style backgrounds seen on both reference sites.

### 2.2 Typography
- **Display/Headings:** `Satoshi` or `General Sans` (geometric, app-like) — weight 600–800.
- **Body:** `Inter` or `Inter Tight` — weight 400–500, 16–18px base, 1.6 line-height.
- **Mono (for code/API sections):** `JetBrains Mono`.
- Type scale (fluid via `clamp()`):
  - H1: `clamp(2.5rem, 5vw, 4.5rem)`
  - H2: `clamp(1.75rem, 3vw, 2.75rem)`
  - Body: `clamp(1rem, 1.1vw, 1.125rem)`

### 2.3 Iconography & Imagery
- Use real **device mockups** (iPhone 15/16 frame + Pixel frame) for every app screenshot — never bare screenshots.
- App icons rendered as true **squircles** (iOS superellipse), consistent 20% corner radius.
- Icon set: Phosphor Icons or Lucide (outline, 1.5px stroke) for UI; custom animated icons for feature callouts.
- Photography style: abstract 3D renders (glass, gradients, floating UI cards) rather than stock photos of "people using phones."

### 2.4 Spacing & Grid
- 8px base spacing unit. Section vertical rhythm: 96–160px desktop, 56–72px mobile.
- 12-column grid, max content width 1280px, generous gutters (32px desktop / 16px mobile).
- Cards use consistent 24px internal padding, 16–20px radius, 1px hairline border + soft shadow (`0 8px 30px rgba(0,0,0,0.12)`).

---

## 3. Animation & Motion System

### 3.1 Motion Principles
1. **Purposeful, not decorative** — every animation should confirm an action, guide attention, or communicate state (loading, success, error).
2. **Spring over linear** — use spring/ease-out curves (`cubic-bezier(0.16, 1, 0.3, 1)`) to feel native/app-like, avoid robotic linear transitions.
3. **60fps discipline** — animate only `transform` and `opacity`; avoid animating `width`, `top/left`, `box-shadow` directly on scroll.
4. **Respect `prefers-reduced-motion`** — every animation must have a reduced/no-motion fallback.

### 3.2 Page-Level Interactions
| Interaction | Behavior |
|---|---|
| **Hero load** | Staggered fade+slide-up of headline (80ms stagger per word/line), device mockup floats in with slight 3D tilt (parallax on mouse move, disabled on touch) |
| **Scroll-triggered reveals** | IntersectionObserver-based fade+translateY(24px→0) for each section; stagger children (cards, list items) by 60–100ms |
| **Sticky nav** | Shrinks height + adds blur/backdrop-filter after 80px scroll; active section highlighted via scroll-spy |
| **App showcase carousel** | Horizontal drag/swipe with momentum (Framer Motion `drag` or native scroll-snap); auto-advance pauses on hover/focus |
| **Pricing toggle (Monthly/Yearly)** | Animated sliding pill background + number "roll" transition on price change |
| **CTA buttons** | Magnetic hover effect (button shifts slightly toward cursor within a 12px radius), scale(0.97) on press |
| **Testimonials** | Marquee/infinite scroll (pause on hover), or 3D card-flip carousel |
| **Store badges (App Store / Play Store)** | Subtle bounce-in on view + shimmer sweep every 6s to draw the eye |
| **Rating stars** | Sequential fill-in animation counting up (e.g., "4.8 ★" counts from 0 → 4.8) |
| **Form success states** | Checkmark draws via SVG `stroke-dashoffset` animation + confetti burst (canvas-confetti, sparse) |
| **Page transitions (SPA)** | Shared-element transition where a clicked app-card morphs into the app detail page hero (View Transitions API or Framer Motion `layoutId`) |
| **Cursor** | Custom cursor that morphs into a "Play" or "View" pill when hovering interactive app cards (desktop only) |

### 3.3 Micro-interactions
- Nav links: underline draws left-to-right on hover (`transform: scaleX`).
- Cards: lift (`translateY(-6px)` + shadow increase) + border glow on hover.
- Toggle switches, checkboxes, radio buttons styled as native iOS/Android controls with spring animation.
- Skeleton loaders (shimmer gradient sweep) for any async content (app list, reviews, pricing from CMS).
- Toast notifications slide in from top-right, mimicking a real push notification, complete with app icon + auto-dismiss progress bar.

### 3.4 Performance Budget for Motion
- Animation library: **Framer Motion** (React) or **GSAP + ScrollTrigger** (vanilla/HTML).
- Lazy-load animation libraries only on routes that need them.
- Cap simultaneous animated elements in viewport to ~12 to avoid jank on low-end devices.
- Test on throttled CPU (4x slowdown) + 3G network profile in Lighthouse before shipping.

---

## 4. Experience Details (the "feel")

- **Sound (optional, muted by default):** subtle UI click/tap sounds toggleable in settings — reinforces "this company builds real apps."
- **Live device frame demo:** an interactive iPhone/Android frame embedded in hero where visitors can tap through a real prototype (using an embedded Figma prototype or a custom React app-shell simulation).
- **Dark mode as default** for the marketing site (matches developer/tech audience expectations) with light mode toggle.
- **Empty/loading/error states** designed with the same care as primary flows — no default browser alerts, no jarring layout shifts (reserve space with skeletons).
- **Accessibility of motion:** all animated content also fully functional/readable with motion off, and with keyboard-only navigation (visible focus rings styled to match brand, not browser default).

---

## 5. Component Library Checklist
- Navbar (sticky, mega-menu for Services / Apps / Pricing / Resources)
- Hero (with device mockup + animated background)
- Logo/client trust bar (marquee)
- Service cards (User Showcase Why our App is used)
- App showcase grid/carousel (apps built & sold directly)
- Process Story timeline (Discover → Design → Build → Launch → Grow)
- Testimonials/reviews (with real star ratings pulled from Store APIs if possible)
- FAQ accordion
- Blog/resources grid
- Footer (sitemap, social, store badges, legal links)
- Contact/quote-request form (multi-step)
- 404 and maintenance page (on-brand, animated)
