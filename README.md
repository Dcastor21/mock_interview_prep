# PrepWise — AI-Powered Mock Interview Platform

PrepWise is a full-stack web app that lets job seekers practice job interviews with a real-time, voice-based AI interviewer and get instant, structured feedback afterward — no need to schedule a mock interview with another person.

> **Live demo:** `[add your deployed Vercel URL here]`
> **Screenshots / demo video:** see [Project Evidence](#project-evidence) below

## Problem

Practicing for interviews out loud is one of the best ways to prepare, but it's hard to do on your own — you either need to rope in a friend, pay for a coach, or just rehearse silently in your head, which doesn't build real speaking confidence. PrepWise makes realistic, on-demand interview practice available any time, with objective feedback on how you actually performed.

## Approach

1. **Auth** — Users sign up / sign in with Firebase Authentication. A server action (`lib/actions/auth.actions.ts`) exchanges the client-side ID token for an HTTP-only session cookie so auth state can be checked on the server for every route.
2. **Interview generation** — A user (or an admin flow) requests an interview for a given role, seniority level, tech stack, and question style (technical / behavioral / mixed). An API route (`app/api/vapi/generate/route.ts`) calls Google's Gemini model to generate a tailored list of interview questions, then stores the interview in Firestore.
3. **Live voice interview** — On the interview page, the `Agent` component starts a real-time voice session with [Vapi](https://vapi.ai), configured with a custom interviewer persona and system prompt (`constants/index.ts`) and the generated question list. The user speaks their answers out loud; Vapi handles speech-to-text, the conversation, and text-to-speech for the AI interviewer.
4. **AI-scored feedback** — When the call ends, the full transcript is sent to Gemini (via the Vercel AI SDK's `generateObject`, with a strict Zod schema) to produce a structured evaluation: an overall score plus scores and comments across five categories (Communication Skills, Technical Knowledge, Problem Solving, Cultural Fit, Confidence & Clarity), a strengths list, an areas-for-improvement list, and a final written assessment. This is saved to Firestore and shown on a feedback page.
5. **History** — Past interviews and feedback are listed on the home page per user, pulled from Firestore.

## Tools & Technologies

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling / UI:** Tailwind CSS v4, shadcn/ui, Radix UI primitives, Lucide icons
- **Auth & Database:** Firebase Authentication, Firestore, Firebase Admin SDK (server-side session verification)
- **AI:**
  - [Vapi](https://vapi.ai) — real-time voice agent for the live interview conversation (Deepgram for transcription, ElevenLabs for the interviewer's voice)
  - Google Gemini (`gemini-2.0-flash-001`), via the [Vercel AI SDK](https://sdk.vercel.ai/) — question generation (`generateText`) and structured feedback scoring (`generateObject` + Zod schema)
- **Forms/validation:** React Hook Form + Zod
- **Deployment:** Vercel

## Results / Outcomes

- A working end-to-end product: account creation → AI-generated interview → live voice interview with an AI interviewer → automatically scored, structured feedback report.
- Shipped and merged a fix for a React Server Components CVE flagged by Vercel's automated security scanning, and improved error handling / user-profile field handling in the auth flow after the initial build.
- `[Add anything else concrete: e.g. number of practice interviews you've run through it yourself, any performance/UX issue you found and fixed, any feature you added beyond the original build.]`

## Project Evidence

`[Add 2-3 screenshots here — e.g. the landing/dashboard page, an active voice interview in progress, and a feedback report — plus a link to your live Vercel deployment if you have one. A short screen recording or GIF of a full interview → feedback flow is even better if you have the time.]`

## Individual Contribution

This project was built solo, following the architecture and approach taught in JavaScript Mastery's AI mock interview platform tutorial, then extended with my own fixes and adjustments — including patching a React Server Components security vulnerability flagged after deployment and improving error handling in the sign-up flow. I can walk through any part of the codebase, including the Firebase session-cookie auth flow, the server actions layer, and how the structured AI feedback scoring is implemented.

## Project Structure

```
app/
  (auth)/         # sign-in / sign-up routes + layout
  (root)/         # authenticated app: home, interview, feedback pages
  api/vapi/        # API route that generates interview questions
components/        # UI components (Agent, AuthForm, InterviewCard, ui/ primitives)
firebase/           # Firebase client + admin SDK setup
lib/actions/        # server actions (auth, interviews/feedback)
constants/           # interviewer persona/prompt, feedback schema, tech-stack mappings
types/                # shared TypeScript types
```

## Running Locally

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/Dcastor21/mock_interview_prep.git
   cd mock_interview_prep
   npm install
   ```
2. Create a `.env.local` file in the project root with:
   ```bash
   # Firebase Admin (server-side)
   FIREBASE_PROJECT_ID=
   FIREBASE_CLIENT_EMAIL=
   FIREBASE_PRIVATE_KEY=

   # Google Gemini (Vercel AI SDK reads this automatically)
   GOOGLE_GENERATIVE_AI_API_KEY=

   # Vapi (public/browser-exposed by design)
   NEXT_PUBLIC_VAPI_WEB_TOKEN=
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=
   ```
   You'll need a [Firebase](https://firebase.google.com/) project (Auth + Firestore enabled) and a [Vapi](https://vapi.ai) account/assistant to fill these in.
3. Run the dev server:
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000).

## License

`[Add a license if you want one, e.g. MIT — optional but a nice professional touch.]`
