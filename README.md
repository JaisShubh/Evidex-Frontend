# EVIDEX frontend

React + Vite client for the EVIDEX API. The UI uses persisted API data; AI analysis is labelled as generated or sample, and profile sharing is scoped and revocable.

## Run locally

1. Install Node.js 20 or newer.
2. Install dependencies: `npm install`.
3. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` if the API is not at `http://localhost:4000/api`.
4. Start the API and database using the instructions in the Backend repository.
5. Start the client: `npm run dev`.

The development server runs at `http://localhost:5173`.

## Implemented screens

- Public landing page and account sign-in/registration.
- Dashboard, evidence profile, user projects, limited profile shares, task submission history, trial tasks, Idea Lab and opportunity matching/applications.
- Reviewer/admin review queue with task-rubric scoring, feedback and decisions.
- Public read-only view for expiring scoped profile shares.
- Founder/admin scoped brief creation, AI draft generation, publication, invitations, and submission comparison; student invitation responses and team formation/submission comparison.
- Student talent-board consent and authorized reviewer/mentor candidate search; mutually agreed resource swaps.
- Founder/admin opportunity drafts and application review; admin task drafting, editing, publication, and archival.

Review decisions, verification warnings, matches, and AI suggestions reflect the backend's documented limitations. In particular, completeness checks do not prove authorship, match scores are not job probabilities, and sample AI content is not live-generated output.

## Build

```sh
npm run build
npm run preview
```

See the Backend repository's `docs/API_CONTRACT.md` for route definitions and role requirements. Candidate and resource-swap invitations use recipient account IDs because the API does not provide a general recipient lookup flow. The user interface is API-wired, but a browser session against a configured API and MongoDB is still needed to verify live role-specific workflows.
