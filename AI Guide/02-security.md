# Security Specification
### AppStore/PlayStore App Distribution & Development Company Website

This document defines the security posture for the marketing/distribution website, the client-facing portal (quote requests, project dashboards), and the app-sales/download experience.

---

## 1. Transport & Infrastructure Security

- **HTTPS everywhere** — TLS 1.2+ enforced, TLS 1.3 preferred; HTTP→HTTPS redirect at the edge (CDN/load balancer level), never in application code alone.
- **HSTS** header with `max-age=31536000; includeSubDomains; preload`.
- **CDN + WAF** (e.g., Cloudflare) in front of origin: DDoS mitigation, bot management, rate limiting at the edge.
- Origin server locked to CDN IP ranges only (no direct public origin access).
- Infrastructure-as-code for hosting config; no manual server changes ("ClickOps") in production.
- Automatic security patching for OS/runtime; dependency vulnerability scanning in CI (Dependabot/Snyk).

## 2. HTTP Security Headers
| Header | Value / Purpose |
|---|---|
| `Content-Security-Policy` | Restrict script/style/img/frame sources to self + explicitly allow-listed domains (payment processor, analytics, CDN fonts). Disallow `unsafe-inline` where possible; use nonces for required inline scripts. |
| `X-Frame-Options` | `DENY` (prevent clickjacking of quote forms/checkout) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disable camera/mic/geolocation except where explicitly needed |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-site` |

## 3. Application-Layer Security

### 3.1 Forms (Quote Requests, Contact, Newsletter)
- Server-side validation & sanitization of all inputs (never trust client-side validation alone).
- CSRF tokens on all state-changing form submissions.
- Honeypot fields + invisible CAPTCHA (Cloudflare Turnstile/hCaptcha) to stop bot spam without harming UX.
- Rate limiting per IP/session on form submission endpoints (e.g., 5 requests/minute).
- File upload fields (e.g., "attach your app spec/brief"): restrict file types, scan for malware, store outside web root, serve via signed short-lived URLs, size-limit (e.g., 10MB).
- No sensitive data (payment info, credentials) ever transmitted via plain contact forms.

### 3.2 Authentication (Client Portal / Dashboard)
- If a client login portal exists (project status, invoices, downloadable builds):
  - Password hashing with **Argon2id** (or bcrypt with sufficient cost factor) — never plaintext or reversible encryption.
  - Mandatory **MFA** (TOTP or WebAuthn/passkeys preferred) for portal access.
  - Session tokens: httpOnly, `Secure`, `SameSite=Lax/Strict` cookies; short-lived access tokens + rotating refresh tokens.
  - Account lockout / exponential backoff after repeated failed logins.
  - Full audit log of login events, IP, device fingerprint, downloadable by the client for transparency.

### 3.3 App Distribution & Downloads
- Direct APK/IPA distribution (for sideload/enterprise builds) must be:
  - Code-signed with verified certificates (Apple Developer cert / Android app signing key), signature verified before serving.
  - Served over authenticated, expiring signed URLs — never a permanent public link to a raw binary.
  - Checksummed (SHA-256) with the hash published next to the download link so users can verify integrity.
- For Store-hosted apps, always link to the **official App Store/Play Store listing** rather than hosting binaries directly — reduces liability and malware risk.
- Malware scanning (VirusTotal API or similar) integrated into the CI/CD pipeline before any build is published or linked publicly.

### 3.4 Payments (if selling apps/subscriptions directly)
- **Never** handle raw card data on your own servers — use PCI-DSS compliant processors (Stripe, Paddle, RevenueCat for mobile subscriptions) via hosted checkout / tokenization.
- Webhooks from payment processors must verify signatures (e.g., Stripe `Stripe-Signature` header) before processing.
- Store only processor-issued customer/subscription IDs, never card numbers, CVV, or full billing details, in your own database.

## 4. Data Protection & Privacy

- **Data minimization** — collect only what's needed for quotes/support (name, email, project brief); avoid unnecessary PII.
- **Encryption at rest** for any database holding client briefs, contracts, or personal data (AES-256).
- **Regional compliance**:
  - **GDPR** (EU/UK visitors): cookie consent banner (granular opt-in for analytics/marketing, not pre-ticked), right to access/erasure workflow, Data Processing Agreements with any subprocessor (analytics, email tool, hosting).
  - **CCPA/CPRA** (California): "Do Not Sell/Share My Info" link if applicable.
  - **App privacy labels**: since the company also *builds* apps, the marketing site should link to each distributed app's privacy policy and Apple "Nutrition Label" / Play "Data Safety" disclosures — consistency between web claims and store disclosures is legally required.
- Cookie/consent management tool (e.g., Cookiebot, Osano) gating analytics/ad scripts until consent given.
- Clear, plain-language **Privacy Policy**, **Terms of Service**, and (for client work) a **Master Services Agreement / NDA template** linked in the footer.

## 5. Secure Development Lifecycle

- All code in version control (Git) with mandatory PR review before merge to `main`.
- Secrets (API keys, signing certs) stored in a secrets manager (Vault/1Password/GitHub Actions secrets) — never committed to the repo.
- `.env` files git-ignored; `.env.example` committed with placeholder values only.
- Automated security scanning in CI: SAST (e.g., Semgrep), dependency audit (`npm audit`/`pip-audit`), secret-scanning (gitleaks/truffleHog) on every push.
- Staging environment mirrors production but is not publicly indexable (`noindex` + basic auth or IP allow-list).
- Regular (at least annual) third-party penetration test for the client portal and payment flows.

## 6. Monitoring, Logging & Incident Response

- Centralized logging (structured logs) for auth events, form submissions, payment webhooks, and admin actions — retained per a defined policy (e.g., 90 days) and access-controlled.
- Real-time alerting for: repeated failed logins, WAF rule triggers, unusual traffic spikes, error-rate spikes on payment/download endpoints.
- Documented **Incident Response Plan**: detection → containment → eradication → recovery → post-mortem, with a named on-call owner.
- Published **`security.txt`** file (per RFC 9116) at `/.well-known/security.txt` with a responsible-disclosure contact and PGP key, so researchers can report vulnerabilities safely.
- Bug bounty or at minimum a clear "Report a Vulnerability" page, linked from the footer.

## 7. Third-Party & Supply Chain

- Vet all third-party scripts (analytics, chat widgets, ad pixels) — load via tag manager with CSP allow-listing, subresource integrity (SRI) hashes on any externally hosted JS/CSS.
- Quarterly review of all connected SaaS tools and their data access scopes; remove unused integrations.
- Vendor risk assessment before adopting any new tool that touches client data or source code (e.g., AI coding assistants, analytics platforms).

## 8. Checklist Before Launch
- [ ] SSL Labs score A/A+
- [ ] securityheaders.com score A
- [ ] OWASP ZAP / Burp automated scan clean of high/critical findings
- [ ] Privacy Policy & Terms reviewed by legal counsel
- [ ] Cookie consent tested in EU geo
- [ ] `security.txt` published
- [ ] Payment webhook signature verification tested
- [ ] Rate limiting verified on all public POST endpoints
- [ ] Backup & restore drill completed for client portal database
