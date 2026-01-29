## Playwright Automation Portfolio (TypeScript)

Production-grade Playwright + TypeScript automation framework designed as a **public portfolio** to impress senior engineers, QA leads, and hiring managers in under a minute.

The focus is on **architecture quality, maintainability, and real-world patterns**, not test volume.

---

### Project Purpose

- **Showcase**: Demonstrates how to design a scalable, team-ready UI automation framework.
- **Teach**: Encodes modern best practices (POM, fixtures, utilities, CI, env config).
- **Hire-ready**: Structure and naming are intentionally similar to what you would expect in a mature product repo.

Target demo site: **Sauce Demo** (`https://www.saucedemo.com`) – a stable, public e‑commerce sample app.

---

### Tech Stack

- **Language**: TypeScript
- **Test Runner**: Playwright Test (`@playwright/test`)
- **Runtime**: Node.js (v18+ / v20+)
- **CI**: GitHub Actions (HTML report as artifact)

---

### Architecture Overview

High-level principles:

- **Page Object Model**: Pages encapsulate behaviors; tests express intent, not selectors.
- **Components**: Reusable UI fragments (e.g. cart, header) composed into pages.
- **Fixtures**: Typed Playwright fixtures to inject pages, utilities, and env config into tests.
- **Utilities**: `waitUtils`, `assertionUtils`, `dataUtils` for reusable cross-cutting concerns.
- **Config-driven**: `TEST_ENV` (`dev` / `stage`) selects environment and credentials.
- **Deterministic**: No hard-coded sleeps; waits are based on locators and URL assertions.
- **Parallel-first**: Tests are safe for parallel execution; retry strategy is CI-aware.

---

### Folder Structure

Conceptual structure:

```text
src/
  config/
    environments.ts        # Environment-based configuration (dev / stage)

  fixtures/
    baseTest.ts            # Extended Playwright test with typed fixtures

  pages/                   # Page Object Model (POM)
    LoginPage.ts
    InventoryPage.ts
    CheckoutPage.ts

  components/              # Reusable UI fragments
    CartComponent.ts
    HeaderComponent.ts

  utils/
    waitUtils.ts           # Explicit, intentful waits (no hard-coded sleeps)
    assertionUtils.ts      # High-level expectations (URLs, pages, errors)
    dataUtils.ts           # Deterministic test data builders

  tests/
    smoke/
      login-smoke.spec.ts          # Happy-path login smoke guardrail
    e2e/
      login-flow.spec.ts           # Locked-out login scenario
      checkout-form-validation.spec.ts
      dashboard.spec.ts            # Authenticated dashboard verification

playwright.config.ts       # Playwright runner configuration
```

---

### Sample Scenarios Implemented

- **Login flow**
  - Standard user can authenticate and reach the products dashboard.
  - Locked-out user is prevented from logging in and sees a meaningful error.

- **Form submission with validation**
  - Checkout form enforces required fields (`firstName`, `lastName`, `postalCode`).
  - Test walks through the real flow: login → add to cart → cart → checkout step one.

- **Authenticated dashboard verification**
  - Logged-in user sees inventory items and can complete a checkout successfully.
  - Cart badge count, inventory count, and confirmation header are all asserted.

All of these use **page objects, components, fixtures, and utilities**, rather than inlining selectors in tests.

---

### Environment Configuration

File: `src/config/environments.ts`

- **Environments**:
  - `dev` (default)
  - `stage`
- Selected via `TEST_ENV` environment variable:

```bash
TEST_ENV=dev npx playwright test
TEST_ENV=stage npx playwright test
```

Each environment defines:

- `baseURL` (Sauce Demo URL)
- User credentials:
  - `standard_user` / `secret_sauce`
  - `locked_out_user` / `secret_sauce`

Unknown `TEST_ENV` values are **safely coerced to `dev`**, keeping behavior deterministic.

---

### Playwright Configuration Highlights

File: `playwright.config.ts`

- **Test directory**: `./src/tests`
- **Parallelism**:
  - `fullyParallel: true`
  - `workers: 4` on CI (default locally)
- **Retries**:
  - `2` retries on CI
  - `0` retries locally
- **Reporters**:
  - `list` (console)
  - `html` → `playwright-report` (for local + CI artifact)
- **Use config**:
  - `baseURL` from `getEnvironmentConfig()`
  - `trace: 'on-first-retry'`
  - `screenshot: 'only-on-failure'`
  - `video: 'retain-on-failure'`
  - Tight action/navigation timeouts to avoid hidden implicit flakiness.
- **Browsers / projects**:
  - Chromium (`Desktop Chrome`)
  - Firefox (`Desktop Firefox`)
  - WebKit (`Desktop Safari`)

---

### Fixtures and Page Objects

- **`src/fixtures/baseTest.ts`**
  - Extends Playwright’s `test` with typed fixtures:
    - Pages: `loginPage`, `inventoryPage`, `checkoutPage`
    - Utilities: `waitUtils`, `assertionUtils`, `dataUtils`
    - Config: `envConfig`
  - Tests import from `@fixtures/baseTest` and focus purely on business behavior.

- **Page Objects**
  - `LoginPage`
    - `goto()`, `login()`, `loginAsStandardUser()`, `assertLockedOutError()`
    - Knows nothing about test structure – only about login concerns.
  - `InventoryPage`
    - `assertLoaded()`, `addFirstItemToCart()`, `getInventoryCount()`
    - Composes `CartComponent` and `HeaderComponent`.
  - `CheckoutPage`
    - `startCheckout()`, `submitCustomerDetails()`, `completeCheckout()`
    - Validation helpers and confirmation verification.

- **Components**
  - `CartComponent`
    - `openCart()`, `getItemCount()`
  - `HeaderComponent`
    - `logout()` behavior (example of shared navigation logic).

---

### How to Run Locally

**Prerequisites**

- Node.js **18+** (20 recommended)
- npm or yarn

**Install dependencies**

```bash
npm install
```

**Install Playwright browsers (first run)**

```bash
npx playwright install
```

**Run the full suite**

```bash
npm test
```

**Run only smoke tests**

```bash
npm run test:smoke
```

**Run only e2e tests**

```bash
npm run test:e2e
```

**Run headed for debugging**

```bash
npm run test:headed
```

**Open the HTML report**

```bash
npm run test:report
```

**Switch environment (optional)**

```bash
TEST_ENV=stage npm test
```

---

### Continuous Integration (GitHub Actions)

File: `.github/workflows/ci.yml`

Pipeline behavior:

- **Triggers**:
  - `push` and `pull_request` on `main` / `master`.
- **Job steps**:
  - Check out repository.
  - Set up Node.js 20.
  - Install dependencies (`npm ci` with fallback to `npm install`).
  - Install Playwright browsers (`npx playwright install --with-deps`).
  - Run Playwright tests with:
    - `TEST_ENV=stage`
    - `CI=true`
  - Always upload the **HTML report** as an artifact named `playwright-html-report`.

This mirrors real-world CI behavior: reliable, non-interactive, and report-friendly.

---

### Design Decisions & Rationale

- **Strongly-typed fixtures over global helpers**
  - Using Playwright’s fixture model keeps tests declarative and discoverable.
  - New projects simply extend `baseTest` rather than reinventing wiring.

- **Components layered under pages**
  - Encourages reuse of shared UI behaviors (e.g., cart, header, dialogs).
  - Makes refactors (new header, new cart badge) localized to components.

- **No hard-coded waits**
  - All waits rely on `Locator`-based expectations (`waitUtils`, `assertionUtils`).
  - This is critical for stability across environments and CI speeds.

- **Environment-first configuration**
  - `TEST_ENV`-driven config simulates `dev` vs `stage` setups used in production.
  - Makes it trivial to scale to multiple backends or feature flags later.

- **Parallel & CI-aware by default**
  - `fullyParallel`, multiple browser projects, and CI retries model real pipelines.
  - HTML reports and traces/videos on failure optimize debugging signal.

If you’re reviewing this as a hiring manager or architect: the goal is not exhaustive coverage of Sauce Demo, but rather to clearly demonstrate **how** I would structure and operate a modern UI automation codebase for long-term ownership. 

