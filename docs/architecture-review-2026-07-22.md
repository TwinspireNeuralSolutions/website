# Architecture review — 2026-07-22

Scope: auth / team-manager area (recent hot spot — role-enforcement fix, new Vitest suite).

## Candidates

### A. Unify the manager-role check — Strong

**Files:** `hooks/useIsTeamManager.ts:18`, `services/firebase/utils/auth-utils.ts:151`

The allow-list `['team-manager', 'team', 'manager']` is duplicated in both files. `auth-utils.ts`'s copy has zero test coverage — only the `useIsTeamManager` copy is tested. This is the exact duplication class the recent "enforce manager role on protected routes" fix had to patch.

**Solution:** extract a single `isManagerRole(role)` module; both call sites depend on it.

**Status:** done. `isManagerRole`/`MANAGER_ROLES` added to `services/firebase/utils/auth-utils.ts`, exported from the barrel (`services/firebase/index.ts`), consumed by both `validateUserProfile` and `hooks/useIsTeamManager.ts`. New test `services/firebase/utils/auth-utils.test.ts` closes the coverage gap.

### B. Deepen the three sign-in mutations into one core — Strong

**Files:** `services/firebase/mutations/useSignInEmailPassword.ts`, `useSignInGoogle.ts`, `useSignInApple.ts`, `hooks/useAuth.ts`

Each mutation repeats identical `onSuccess` cache-invalidation, `onError` dev-logging, and `{signInResult, profile}` shape — the only real variation is the provider credential call.

**Solution:** one deep `useSignInCore` module owning the shared mutation lifecycle; each provider supplies only its credential-acquisition adapter.

**Status:** done. `services/firebase/mutations/useSignInCore.ts` added as the shared mutation lifecycle (not-ready guard, error mapping delegation, profile validation, cache invalidation/seeding, dev-only error logging). `useSignInEmailPassword.ts`, `useSignInGoogle.ts`, `useSignInApple.ts` reduced to thin adapters supplying only `acquireCredential`/`mapError`/`logLabel`. `useAuth.ts` untouched — its public interface didn't change. New test `services/firebase/mutations/useSignInCore.test.ts` covers the not-ready guard, error mapping, and cache seeding (previously untested). Bundled fix: the email adapter's "not ready" error now carries the same `auth/not-initialized` name/code as Google/Apple (message text unchanged).

### C. Extract the dashboard's upload logic into a deep hook — Strong

**Files:** `app/[locale]/admin/dashboard/page.tsx` (480 lines), cf. `app/[locale]/admin/page.tsx` + `hooks/useAdminLogin.ts`

`DashboardContent` mixes upload state, drag/drop, device-selection, and API-call logic directly with JSX in one 480-line module. The sibling login page already deepened this exact shape (`useAdminLogin.ts` + presentational components); the dashboard didn't get the same treatment.

**Solution:** extract a `useFileUpload`/`useDashboard` hook; leave `DashboardContent` as JSX only.

**Status:** done. `app/[locale]/admin/dashboard/hooks/useFileUpload.ts` now owns device selection, drag/drop, validation, and the upload API call; `dashboard/page.tsx` shrank from 480 to 342 lines and is JSX plus a `handleLogout` (auth-only, left in the page). New test `useFileUpload.test.ts` exercises the hook directly (invalid file type, missing device, missing user, successful upload, reset flow) — the existing `dashboard/page.test.tsx` (DOM-level) still passes unmodified, confirming behavior parity.

### D. Share the "wait on auth+profile, derive manager status" seam — Worth exploring

**Files:** `components/auth/ProtectedRoute.tsx:20-28`, `app/[locale]/admin/page.tsx:32-72`

`ProtectedRoute` and the login page both independently combine `useAuth` + `useGetProfile` + `useIsTeamManager` and re-derive their own loading/authorized state machine.

**Solution:** a shared `useManagerAuthStatus()` returning a single status (`loading | unauthenticated | unauthorized | authorized`).

**Status:** not started.

### E. Split middleware's locale and security-header concerns — Speculative

**Files:** `middleware.ts:57-85`

Not a real deepening opportunity — `applySecurityHeaders` and `detectLocaleFromRequest` are already separate functions with no shared state. Deletion test fails (removing locale detection wouldn't concentrate complexity anywhere). Noted for completeness, not recommended.

## Top recommendation

**A** — smallest change, clearest payoff, closes a real test gap, and targets the duplication class that already caused a production bug.

---

Full visual report (Mermaid diagrams, before/after): `/tmp/architecture-review-tns-website.html` (temp file, not persisted).
