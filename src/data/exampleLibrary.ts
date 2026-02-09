export interface ExampleTier {
  text: string
  why: string
}

export interface Example {
  poor: ExampleTier
  good: ExampleTier
  excellent: ExampleTier
}

export type ExampleCategory = 'fitness' | 'productivity' | 'social' | 'finance' | 'education' | 'creative'

export const EXAMPLE_CATEGORIES: ExampleCategory[] = ['fitness', 'productivity', 'social', 'finance', 'education', 'creative']

export const exampleLibrary: Record<string, Record<ExampleCategory, Example>> = {
  app_description: {
    fitness: {
      poor: { text: 'A fitness app', why: 'Too generic - could be anything from a step counter to a gym finder' },
      good: { text: 'A fitness app for busy parents', why: 'Better - identifies the target user, but still lacks specific functionality' },
      excellent: { text: 'A 15-minute workout tracker for working parents who need quick, effective exercises they can do during school drop-off/pick-up times', why: 'Specific time frame (15 min), clear user (working parents), clear context (school drop-off), and clear value (quick, effective)' },
    },
    productivity: {
      poor: { text: 'A task manager', why: 'Completely generic - no differentiation from thousands of existing apps' },
      good: { text: 'A task manager for remote workers', why: 'Identifies target user but does not explain what makes it unique' },
      excellent: { text: 'A context-aware task manager for remote workers that automatically organizes tasks by energy level, suggesting high-focus work during peak hours and admin tasks during afternoon energy dips', why: 'Unique angle (energy-aware scheduling), specific user need (remote work challenges), clear differentiation from existing tools' },
    },
    social: {
      poor: { text: 'A social app', why: 'Vague and unhelpful - social for what? Who?' },
      good: { text: 'A social app for book lovers', why: 'Identifies niche but does not explain core functionality' },
      excellent: { text: 'A micro-book-club app where busy readers (25-40) can join 30-day reading challenges with 5-10 strangers, discussing chapters via voice notes they can listen to during commutes', why: 'Specific format (30-day challenges), target demographic (25-40 busy readers), clear UX (voice notes), specific use case (commute time)' },
    },
    finance: {
      poor: { text: 'A budgeting app', why: 'Too generic - could be anything from spreadsheets to full accounting' },
      good: { text: 'A budgeting app for millennials', why: 'Identifies user but does not explain what makes it different' },
      excellent: { text: 'A subscription and recurring-expense tracker for millennials (25-40) who lose track of small monthly charges and want to see where their money actually goes without manual categorization', why: 'Specific focus (subscriptions), target user, clear pain (losing track), and what it avoids (manual work)' },
    },
    education: {
      poor: { text: 'A learning app', why: 'Completely vague - learning what? For whom?' },
      good: { text: 'A flashcard app for students', why: 'Identifies format and user but lacks differentiation' },
      excellent: { text: 'A spaced-repetition flashcard app for medical students that syncs with Anki decks and adds AI-generated clinical case questions keyed to exam topics', why: 'Specific user (med students), format (spaced repetition), integration (Anki), and unique value (AI cases)' },
    },
    creative: {
      poor: { text: 'A writing app', why: 'Generic - no differentiation from Notes or Word' },
      good: { text: 'A writing app for aspiring authors', why: 'Identifies user but does not explain core functionality' },
      excellent: { text: 'A lightweight idea-capture and first-draft app for aspiring novelists who get stuck in perfectionism - it rewards quick drafts and word sprints, not polished prose', why: 'Specific user, psychological barrier (perfectionism), mechanism (quick drafts, sprints), and anti-goal (not polish)' },
    },
  },
  why: {
    fitness: {
      poor: { text: 'People need to exercise more', why: 'Generic statement - does not explain why existing solutions fail' },
      good: { text: 'Parents struggle to find time to work out between work and kids', why: 'Identifies a real pain point, but does not go deep enough into the emotional frustration' },
      excellent: { text: "Every fitness app assumes you have 45-60 minutes for a workout. But working parents have unpredictable 15-minute windows between dropping kids at school and starting work. They want to exercise but current apps make them feel like failures because they can't complete full programs. I'm solving the 'all or nothing' mindset by making 15 minutes feel like a real, complete workout - not a compromise.", why: "Identifies specific failure point of competitors (time assumptions), emotional impact (feeling like failures), and clear philosophical difference (15 min as legitimate, not compromise)" },
    },
    productivity: {
      poor: { text: 'Task managers do not work well', why: 'Vague complaint without specific failure mode' },
      good: { text: 'Remote workers struggle with motivation and procrastination throughout the day', why: 'Real problem but does not connect it to why current tools fail' },
      excellent: { text: "Traditional task managers treat all tasks as equal priority at all times. But remote workers know they're not the same person at 9am (high focus) vs 3pm (brain fog). They waste peak energy on easy admin tasks, then struggle through complex work during low-energy hours. Current tools force you to 'just push through' instead of working with your natural rhythms. This causes burnout and guilt when you cannot maintain impossible standards.", why: "Specific insight about human energy (not all hours are equal), identifies how existing solutions fail (treat all tasks the same), emotional consequence (burnout and guilt)" },
    },
    social: {
      poor: { text: 'People want to connect more', why: 'Too broad - does not specify who or how' },
      good: { text: 'Readers want community but book clubs do not fit their schedules', why: 'Identifies user and problem, but lacks depth on the solution' },
      excellent: { text: "Busy readers feel isolated in their reading journey. Traditional book clubs require fixed meeting times that conflict with work and family. They want to discuss books but cannot commit to monthly meetings. Voice notes let them participate asynchronously - listening to others' thoughts during commutes and recording their own when they have a spare moment. The format matches how they actually consume content.", why: 'Specific user need (asynchronous discussion), clear format (voice notes), use case (commutes), and why traditional solutions fail' },
    },
    finance: {
      poor: { text: 'People do not budget well', why: 'Generic - does not explain why or for whom' },
      good: { text: 'Millennials lose track of subscriptions and recurring charges', why: 'Identifies user and problem but lacks depth' },
      excellent: { text: "Bank apps show transactions but not patterns. Budget apps require manual categorization that nobody maintains. Millennials have 5-15 subscriptions they forget about until a random charge hits. They want to see where money leaks without data entry. Current tools assume either too much effort (manual budgets) or too little insight (raw transaction lists).", why: 'Failure of bank apps, failure of budget apps, specific user behavior (subscriptions), and gap in market' },
    },
    education: {
      poor: { text: 'Students need to study better', why: 'Too vague - does not specify subject or method' },
      good: { text: 'Medical students need efficient ways to memorize for exams', why: 'Identifies user and goal but lacks depth' },
      excellent: { text: "Medical students use Anki for spaced repetition but struggle to connect facts to clinical reasoning. They memorize flashcards but fail application-style questions. They need practice with case-based questions keyed to their deck topics, without switching to a separate Qbank that does not sync with their study plan.", why: 'Current tool (Anki), gap (application vs recall), need (case questions), constraint (sync with study plan)' },
    },
    creative: {
      poor: { text: 'Writers need to write more', why: 'Generic - does not explain the blocker' },
      good: { text: 'Aspiring authors get stuck in perfectionism and never finish drafts', why: 'Identifies psychological barrier but lacks solution angle' },
      excellent: { text: "Aspiring novelists have ideas but freeze when faced with a blank page. They edit as they write, get stuck on one paragraph for hours, and never reach 'the end.' Tools like Scrivener and Word reward polished output. Nobody builds for the messy first draft - the phase where speed and permission to be bad matter more than quality.", why: 'Psychological barrier (freeze, perfectionism), failure of existing tools (reward polish), gap (messy first draft), what matters (speed, permission)' },
    },
  },
  problem: {
    fitness: {
      poor: { text: 'People do not exercise enough', why: 'Surface-level - does not explain root cause' },
      good: { text: 'Fitness programs assume too much time', why: 'Identifies constraint but lacks emotional depth' },
      excellent: { text: "Existing fitness apps are built around 45-60 minute workouts. When working parents only have 15 minutes, they skip entirely rather than do 'half a workout.' The all-or-nothing mentality creates a cycle of guilt and avoidance. There is no tool that validates short workouts as legitimate, complete experiences.", why: 'Specific failure of current solutions, psychological barrier (all-or-nothing), and gap in market' },
    },
    productivity: {
      poor: { text: 'People procrastinate', why: 'Generic - does not explain why or for whom' },
      good: { text: 'Remote workers lose focus in the afternoon', why: 'More specific but missing the structural cause' },
      excellent: { text: "Productivity tools ignore circadian rhythms. They treat 9am and 3pm as equal, but our brains are not. Remote workers waste peak focus on email, then fight through complex tasks during afternoon fog. The result: burnout, guilt, and no clear way to match tasks to energy levels.", why: 'Root cause (ignoring energy), consequence (wasted focus), and emotional impact' },
    },
    social: {
      poor: { text: 'People feel lonely', why: 'Too vague' },
      good: { text: 'Readers have no way to discuss books flexibly', why: 'Identifies need but not the format solution' },
      excellent: { text: "Book clubs demand synchronous attendance. Busy readers cannot commit to fixed meeting times. As a result, they read alone and miss the social dimension of reading. Audio-first formats (podcasts, audiobooks) are how they consume content, but discussion tools remain text and meeting-based.", why: 'Specific failure (synchronous requirement), user behavior (audio-first), and mismatch' },
    },
    finance: {
      poor: { text: 'People overspend', why: 'Surface-level - does not explain mechanism' },
      good: { text: 'Subscription charges are hard to track across cards and services', why: 'Identifies challenge but lacks emotional depth' },
      excellent: { text: "Recurring charges are scattered across credit cards, debit, PayPal, and app stores. Users discover forgotten subscriptions only when they audit. Manual categorization in budget apps is tedious and abandoned. There is no tool that automatically surfaces 'what is costing you every month' without data entry or linking banks.", why: 'Scattered data, discovery pattern, failure of manual tools, gap in market' },
    },
    education: {
      poor: { text: 'Students forget what they learn', why: 'Generic - does not specify subject or cause' },
      good: { text: 'Flashcards do not prepare students for application-style exam questions', why: 'Identifies gap but not the solution type' },
      excellent: { text: "Spaced repetition optimizes recall but not application. Medical students pass Anki reviews but struggle on NBME-style questions that require clinical reasoning. They need case-based practice aligned to their deck content, but existing Qbanks do not sync with Anki and duplicate effort.", why: 'Limitation of spaced repetition, exam format gap, need for cases, tool fragmentation' },
    },
    creative: {
      poor: { text: 'Writers do not finish', why: 'Too vague' },
      good: { text: 'Perfectionism slows down first drafts', why: 'Identifies barrier but lacks tool angle' },
      excellent: { text: "Writing tools optimize for editing, not drafting. They encourage polish from line one. Aspiring authors need an environment that rewards output volume and imperfection - word sprints, daily goals, no backspace culture. The market has editing tools and distraction-free editors, but few built for 'get it down, fix it later.'", why: 'Tool bias (editing), psychological need (permission to be bad), format (sprints, goals), market gap' },
    },
  },
  primary_users: {
    fitness: {
      poor: { text: 'Parents', why: 'Way too broad - parents of newborns have different needs than parents of teenagers' },
      good: { text: 'Working parents aged 30-45 with kids in elementary school', why: 'Better demographics, but missing lifestyle and tech comfort details' },
      excellent: { text: "Working parents (30-45) with kids ages 5-12 who drop off/pick up from school. They are tech-comfortable (use apps daily), juggling careers and family, and used to feel fit but now struggle with consistency. They have gym memberships they do not use. They scroll fitness Instagram feeling guilty. They start programs but cannot maintain them.", why: 'Age + life stage, daily routine, tech comfort, emotional state, past behavior, and root problem' },
    },
    productivity: {
      poor: { text: 'Remote workers', why: 'Huge category - could be anyone from freelancers to corporate employees' },
      good: { text: 'Remote knowledge workers who struggle with focus and procrastination', why: 'Identifies the problem but not the context or specifics' },
      excellent: { text: "Remote knowledge workers (late 20s-40s) working from home full-time for tech companies. They have autonomy over their schedules but struggle with self-regulation. Morning people who crash by 2pm. They have tried Pomodoro, time-blocking, and dozens of apps. They know WHAT to do (deep work, time management) but cannot consistently DO it.", why: 'Age range, work context, autonomy level, specific struggle, time-of-day patterns, past attempts, knowledge vs execution gap' },
    },
    social: {
      poor: { text: 'Book lovers', why: 'Too broad - does not specify lifestyle or constraints' },
      good: { text: 'Busy professionals who read but cannot join book clubs', why: 'Identifies constraint but missing demographics' },
      excellent: { text: "Busy readers (25-40) who consume 1-2 books per month. They listen to audiobooks during commutes and read physical books at night. They want community but cannot commit to monthly in-person meetings. They are comfortable with voice notes and async communication from work tools.", why: 'Age, reading habits, format preference (audio), constraint (no fixed meetings), tech comfort' },
    },
    finance: {
      poor: { text: 'Young adults', why: 'Too broad - could be 18 or 35' },
      good: { text: 'Millennials who want to track spending', why: 'Identifies user and goal but lacks specifics' },
      excellent: { text: "Millennials (25-40) with multiple streaming, software, and membership subscriptions. They use credit cards and Apple Pay daily. They have tried budgeting apps and abandoned them. They want to see recurring charges without manual categorization or linking banks. They are comfortable with apps but hate data entry.", why: 'Age, subscription behavior, payment habits, past attempts, constraint (no manual work), tech comfort' },
    },
    education: {
      poor: { text: 'Students', why: 'Huge category - K-12, undergrad, grad, professional' },
      good: { text: 'Medical students studying for board exams', why: 'Identifies user and context but could go deeper' },
      excellent: { text: "Medical students (M2-M4) preparing for Step 1/2 or shelf exams. They use Anki daily with premade and custom decks. They know spaced repetition works for recall but struggle with application-style questions. They want integrated practice without switching tools or re-entering content.", why: 'Stage (M2-M4), exams, current tool (Anki), knowledge vs execution gap, integration need' },
    },
    creative: {
      poor: { text: 'Writers', why: 'Too broad - journalists, bloggers, novelists all differ' },
      good: { text: 'Aspiring fiction authors who struggle to finish drafts', why: 'Identifies goal and struggle but missing habits' },
      excellent: { text: "Aspiring novelists (25-50) who have started multiple projects but rarely finish. They write in bursts, edit compulsively, and get stuck in the middle. They have used Word, Scrivener, or Google Docs. They know they need to 'just write' but existing tools do not reinforce that. They respond well to gamification and accountability.", why: 'Age range, pattern (start but not finish), behavior (edit compulsively), tool history, psychological need, motivation style' },
    },
  },
  primaryPain: {
    fitness: {
      poor: { text: 'They do not have time', why: 'Surface-level observation - does not dig into the emotional weight' },
      good: { text: 'They want to exercise but cannot commit to 45-60 minute workout programs', why: 'More specific about the time constraint, but missing the emotional/psychological impact' },
      excellent: { text: "They wake up wanting to work out, but by the time kids are at school and they are starting work, that 15-minute window feels 'too short to matter.' So they do nothing, then feel guilty all day. They scroll Instagram seeing other parents crushing hour-long workouts, which makes them feel worse. Every Sunday they promise 'this week will be different' and by Wednesday they have already given up.", why: 'Daily emotional journey, social comparison pain, cyclical pattern, psychological impact' },
    },
    productivity: {
      poor: { text: 'They get distracted', why: 'Generic - does not explain when, why, or pattern' },
      good: { text: 'They cannot maintain focus throughout the workday', why: 'Identifies symptom but not cause' },
      excellent: { text: "They start the day with energy and tackle easy tasks first. By 2pm their focus is gone but their hardest work remains. They feel scattered, guilty for 'wasting' the morning, and unsure why some days work and others do not. Productivity advice assumes they can just 'push through' - but they have tried that and it leads to burnout.", why: 'Daily pattern, emotional consequence, failure of common advice' },
    },
    social: {
      poor: { text: 'They want to talk about books', why: 'Vague - does not explain the barrier' },
      good: { text: 'They read alone and miss discussing books with others', why: 'Identifies gap but not the scheduling barrier' },
      excellent: { text: "They finish a great book and have no one to discuss it with. Book clubs require fixed meeting times that conflict with work and family. By the time they could join a meeting, they have moved on to the next book. They want discussion but need it to fit their erratic schedule - preferably in the same async format they use for everything else.", why: 'Emotional moment (finishing a book), structural barrier (fixed times), timing mismatch' },
    },
    finance: {
      poor: { text: 'They do not know where money goes', why: 'Surface-level - does not explain why' },
      good: { text: 'They forget about subscriptions and are surprised by charges', why: 'Identifies symptom but not the emotional impact' },
      excellent: { text: "They check their bank balance and wonder where it went. They have 8+ subscriptions they barely use but forget to cancel. They have tried budgeting apps and given up after two weeks of manual categorization. They feel guilty and avoid looking at their spending. They want insight without effort.", why: 'Confusion, subscription behavior, past failure, avoidance pattern, core need' },
    },
    education: {
      poor: { text: 'They need to pass exams', why: 'Generic - does not specify the study gap' },
      good: { text: 'They memorize facts but struggle with application questions', why: 'Identifies recall vs application gap' },
      excellent: { text: "They ace Anki reviews but bomb practice exams. They know the facts but cannot apply them to clinical scenarios. They use separate Qbanks that do not align with their deck schedule. They feel like they are studying twice. They want practice that reinforces their Anki workflow, not duplicates it.", why: 'Recall vs application, tool fragmentation, emotional impact, integration need' },
    },
    creative: {
      poor: { text: 'They cannot finish writing', why: 'Vague - does not explain cause' },
      good: { text: 'They edit as they write and never reach the end', why: 'Identifies behavior but not emotional weight' },
      excellent: { text: "They open the document, stare at the cursor, and rewrite the same paragraph for an hour. They have 5 unfinished manuscripts. They know the advice: 'just write a bad first draft' - but their tools reward polish. They need something that makes drafting feel productive and editing feel secondary.", why: 'Daily pattern, accumulation (5 manuscripts), advice vs tool mismatch, core need' },
    },
  },
  user_needs: {
    fitness: {
      poor: { text: 'To work out', why: 'Generic - does not specify how or what kind' },
      good: { text: 'Short workouts that fit into busy schedules', why: 'Better - identifies format but lacks emotional need' },
      excellent: { text: 'Workouts that feel complete in 15 minutes, validation that short sessions count, flexibility to do them anytime, and proof they are not "too busy" to take care of themselves.', why: 'Specific format, emotional validation, flexibility, identity proof' },
    },
    productivity: {
      poor: { text: 'To get organized', why: 'Vague - does not explain what organized means' },
      good: { text: 'Help matching tasks to their energy levels', why: 'Identifies unique need but could go deeper' },
      excellent: { text: 'A system that respects their natural energy rhythms, suggests the right task at the right time, and stops making them feel guilty for not being productive 8 hours straight.', why: 'Energy-aware, right task/right time, emotional relief' },
    },
    social: {
      poor: { text: 'To discuss books', why: 'Generic' },
      good: { text: 'Flexible ways to discuss books without fixed meetings', why: 'Identifies format need' },
      excellent: { text: 'Async discussion via voice notes, small groups so it feels intimate, and the ability to participate during commutes or downtime without scheduling calls.', why: 'Format (voice, async), group size, use case' },
    },
    finance: {
      poor: { text: 'To save money', why: 'Vague - does not specify how' },
      good: { text: 'To see recurring charges and subscription totals', why: 'Identifies data need' },
      excellent: { text: 'Automatic detection of subscriptions, a clear monthly recurring total, and the ability to cancel or pause without manual tracking. They want to feel in control without spreadsheets or data entry.', why: 'Auto-detection, recurring total, action (cancel/pause), effort constraint' },
    },
    education: {
      poor: { text: 'To pass exams', why: 'Generic' },
      good: { text: 'Case-based practice that aligns with their flashcards', why: 'Identifies format and integration' },
      excellent: { text: 'AI-generated case questions tied to their Anki deck topics, spaced repetition for both recall and application, and a single workflow instead of juggling Anki + Qbank.', why: 'Question type, linkage to deck, dual practice (recall + application), workflow simplification' },
    },
    creative: {
      poor: { text: 'To write more', why: 'Generic' },
      good: { text: 'A place that rewards drafts over polish', why: 'Identifies value shift' },
      excellent: { text: 'Word sprints with timers, daily word goals, and an interface that hides editing options during drafting. They need permission to be bad and metrics that celebrate output volume, not quality.', why: 'Mechanism (sprints, goals), interface choice (hide editing), psychological need, metric focus' },
    },
  },
  whatTheyWant: {
    fitness: {
      poor: { text: 'To get fit', why: 'Generic and unhelpful - does not explain what fit means to them' },
      good: { text: 'To exercise consistently without needing 60-minute blocks of time', why: 'Better - addresses the time constraint, but does not capture the emotional outcome' },
      excellent: { text: "They want to feel like they are 'doing enough' even with just 15 minutes. They want to finish a workout and feel accomplished - not guilty. They want to prove to themselves they are not 'too busy' to take care of themselves. Success = doing a complete, legitimate workout in the time they actually have.", why: 'Emotional outcomes, mindset shift, identity change, definition of success' },
    },
    productivity: {
      poor: { text: 'To be more productive', why: 'Circular - does not define what productive means' },
      good: { text: 'To stop wasting their peak focus on low-value tasks', why: 'Identifies problem but not the desired state' },
      excellent: { text: "They want to work WITH their energy, not against it. They want to know that when they do deep work at 9am and admin at 3pm, they are not lazy - they are optimizing. Success = feeling productive without burnout, with clear patterns for what works.", why: 'Working with energy, validation, desired state, success definition' },
    },
    social: {
      poor: { text: 'To talk about books', why: 'Generic' },
      good: { text: 'To discuss books with others without committing to meetings', why: 'Identifies format but not emotional outcome' },
      excellent: { text: "They want to feel part of a reading community without the pressure of fixed meetings. They want to share thoughts when inspiration strikes and hear others' perspectives during their commute. Success = regular, meaningful book discussion that fits their life.", why: 'Community without pressure, format fit, success definition' },
    },
    finance: {
      poor: { text: 'To spend less', why: 'Circular - does not define the path' },
      good: { text: 'To see where subscriptions are costing them', why: 'Identifies data need but not outcome' },
      excellent: { text: "They want clarity without effort. They want to know 'what am I paying every month?' at a glance, cancel what they do not use, and feel in control. Success = no surprises, no manual work, and one place to manage recurring spend.", why: 'Clarity, effort constraint, outcome (no surprises), centralization' },
    },
    education: {
      poor: { text: 'To learn better', why: 'Vague' },
      good: { text: 'To improve exam scores with application practice', why: 'Identifies goal but not the workflow' },
      excellent: { text: "They want recall AND application in one flow. They want to study once - Anki for facts, cases for application - without switching tools. Success = passing practice exams and feeling prepared without doubling study time.", why: 'Dual skill (recall + application), single workflow, outcome, efficiency' },
    },
    creative: {
      poor: { text: 'To finish a book', why: 'Generic' },
      good: { text: 'To complete a first draft without perfectionism', why: 'Identifies barrier and goal' },
      excellent: { text: "They want to reach 'the end' of a first draft. They want to feel productive even when the prose is bad. Success = a completed messy draft they can revise later, and a habit of showing up to write instead of edit.", why: 'Outcome (the end), permission (bad prose), revision sequencing, habit shift' },
    },
  },
  core_value: {
    fitness: {
      poor: { text: 'Helps you exercise', why: 'Generic' },
      good: { text: 'Makes short workouts feel effective', why: 'Better - addresses core promise' },
      excellent: { text: "Turns 15 minutes into a legitimate, complete workout - so users feel accomplished instead of guilty. Validates that 'enough' is not 60 minutes; it is what fits their life.", why: 'Specific transformation, emotional shift, reframes enough' },
    },
    productivity: {
      poor: { text: 'Helps you get more done', why: 'Generic' },
      good: { text: 'Matches tasks to your energy level', why: 'Identifies mechanism' },
      excellent: { text: "Aligns tasks with natural energy rhythms so users stop fighting their biology. Reduces burnout and guilt by making 'productive' mean working WITH your body, not against it.", why: 'Mechanism, emotional outcomes, redefines productive' },
    },
    social: {
      poor: { text: 'Lets you discuss books', why: 'Generic' },
      good: { text: 'Enables flexible book discussion', why: 'Identifies format' },
      excellent: { text: "Brings the book club experience to busy readers via async voice notes - so they can participate on their schedule and still feel part of a community.", why: 'Format, user constraint, emotional outcome' },
    },
    finance: {
      poor: { text: 'Helps you budget', why: 'Generic' },
      good: { text: 'Shows recurring charges automatically', why: 'Identifies mechanism' },
      excellent: { text: "Surfaces subscriptions and recurring spend without manual entry - so users see where money goes, cancel what they do not use, and feel in control without spreadsheets or data entry.", why: 'Mechanism (auto surface), actions (cancel), emotional outcome, effort constraint' },
    },
    education: {
      poor: { text: 'Helps you study', why: 'Generic' },
      good: { text: 'Adds case questions to flashcards', why: 'Identifies mechanism' },
      excellent: { text: "Extends Anki with AI-generated clinical cases keyed to deck topics - so students practice application without switching tools or re-entering content. Recall and application in one workflow.", why: 'Integration (Anki), mechanism (AI cases), benefit (no switching), dual practice' },
    },
    creative: {
      poor: { text: 'Helps you write', why: 'Generic' },
      good: { text: 'Focuses on drafting, not editing', why: 'Identifies mechanism' },
      excellent: { text: "Rewards output volume and first drafts over polish - so aspiring authors can finish manuscripts by making 'bad' drafts feel productive and hiding the editing mindset until later.", why: 'Value shift (volume over polish), psychological mechanism, outcome (finish), sequencing' },
    },
  },
  howItWorks: {
    fitness: {
      poor: { text: 'User opens app and does a workout', why: 'No detail on flow or differentiation' },
      good: { text: 'User selects a 15-minute workout, follows along, and gets credit for completing it', why: 'Basic flow but missing onboarding and habit loop' },
      excellent: { text: "User sets their available window (e.g. after school drop-off). App suggests a 15-minute workout for that slot. They follow video/audio guidance. On completion, they see progress and streaks. Key: the app never asks for 60 minutes - every flow is built around short, complete sessions. Habit loop: complete session -> feel accomplished -> return tomorrow.", why: 'Specific flow, key differentiator, habit loop' },
    },
    productivity: {
      poor: { text: 'User adds tasks and checks them off', why: 'Standard task manager - no differentiation' },
      good: { text: 'User adds tasks, rates energy level, and app suggests what to do when', why: 'Identifies energy component but flow is thin' },
      excellent: { text: "User adds tasks and tags them by energy type (deep focus vs admin). App learns their energy patterns (e.g. peak 9-11am). Each morning it suggests: 'Do X and Y now; save Z for afternoon.' User works through the list in the recommended order. Key: the app never treats all hours as equal.", why: 'Task tagging, learning, suggestion flow, differentiator' },
    },
    social: {
      poor: { text: 'Users join a club and discuss', why: 'Vague' },
      good: { text: 'Users join a 30-day challenge, read the book, and leave voice notes to discuss', why: 'Better flow but missing async flexibility' },
      excellent: { text: "Users join a 30-day reading challenge with 5-10 strangers. They read at their own pace. Discussion happens via voice notes - users record thoughts when inspired, listen to others during commutes. No live meetings. Weekly prompts guide discussion. Key: fully async, so participation fits any schedule.", why: 'Challenge format, voice notes, async, no meetings, prompts' },
    },
    finance: {
      poor: { text: 'User links bank and sees transactions', why: 'Standard - no differentiation' },
      good: { text: 'User connects accounts, app detects subscriptions, shows monthly total', why: 'Identifies key feature but flow is thin' },
      excellent: { text: "User connects cards/accounts (or uploads CSV). App detects recurring charges by pattern. Dashboard shows 'What you pay every month' with one-tap cancel links. Key: no manual categorization - the app finds subscriptions automatically. User reviews monthly, cancels what they do not use.", why: 'Connection options, detection mechanism, dashboard, action (cancel), no manual work' },
    },
    education: {
      poor: { text: 'User studies flashcards', why: 'Generic' },
      good: { text: 'User syncs Anki, gets AI case questions, practices both', why: 'Identifies integration and flow' },
      excellent: { text: "User imports or syncs Anki deck. App generates clinical case questions tied to deck topics. User reviews flashcards (recall) and case questions (application) in one session. Spaced repetition applies to both. Key: single workflow - no switching between Anki and a separate Qbank.", why: 'Sync, generation, dual practice, spaced rep, workflow unity' },
    },
    creative: {
      poor: { text: 'User opens app and writes', why: 'No differentiation' },
      good: { text: 'User sets word goal, does sprints, tracks progress', why: 'Identifies mechanism' },
      excellent: { text: "User sets daily word goal (e.g. 500). Starts a timed sprint (15 min). Writes without editing - backspace is disabled or discouraged. On completion, sees word count and streak. Key: the app never asks for polish. It celebrates output. Editing mode is separate and optional.", why: 'Goal, sprint, anti-edit constraint, metrics, value on output' },
    },
  },
  key_actions: {
    fitness: {
      poor: { text: 'Do workouts', why: 'Too generic' },
      good: { text: 'Select workout, start, complete, track progress', why: 'Basic actions but lacks specificity' },
      excellent: { text: 'Set available time slot; browse 15-min workouts by type (strength, cardio, stretch); start workout with audio/video guidance; complete and log; view streaks and history.', why: 'Specific actions in order, format details' },
    },
    productivity: {
      poor: { text: 'Add and complete tasks', why: 'Generic' },
      good: { text: 'Add tasks, set energy level, get suggestions, complete', why: 'Identifies energy flow' },
      excellent: { text: 'Add tasks and tag by energy type; receive daily plan based on predicted energy; drag to reorder; complete and log; review patterns over time.', why: 'Tagging, planning, reordering, completion, review' },
    },
    social: {
      poor: { text: 'Join clubs and talk', why: 'Generic' },
      good: { text: 'Join challenge, read book, record and listen to voice notes', why: 'Core actions' },
      excellent: { text: 'Join a 30-day challenge; read (or listen to) the book; record voice-note thoughts on chapters; listen to others\' notes during commute; react and reply async.', why: 'Challenge, read, record, listen, react - all async' },
    },
    finance: {
      poor: { text: 'Track spending', why: 'Generic' },
      good: { text: 'Connect accounts, view subscriptions, cancel', why: 'Core actions' },
      excellent: { text: 'Connect cards/accounts or upload CSV; review auto-detected subscriptions; see monthly recurring total; one-tap cancel or pause; get alerts for new recurring charges.', why: 'Connect, review, total, cancel, alerts' },
    },
    education: {
      poor: { text: 'Study flashcards', why: 'Generic' },
      good: { text: 'Sync Anki, do flashcards, do case questions', why: 'Core flow' },
      excellent: { text: 'Import or sync Anki deck; review flashcards (recall); complete AI-generated case questions (application); track mastery for both; adjust schedule based on performance.', why: 'Sync, recall practice, application practice, tracking, scheduling' },
    },
    creative: {
      poor: { text: 'Write and edit', why: 'Generic' },
      good: { text: 'Set goal, sprint, log words', why: 'Core actions' },
      excellent: { text: 'Set daily word goal; start timed sprint; write in draft mode (no edit); complete and log words; view streak and history; switch to edit mode only when ready.', why: 'Goal, sprint, draft mode, log, streak, edit separation' },
    },
  },
  whyItMatters: {
    fitness: {
      poor: { text: 'Exercise is important', why: 'Generic' },
      good: { text: 'Parents deserve to feel good about their fitness', why: 'Emotional but vague' },
      excellent: { text: "Working parents carry immense guilt about self-care. This app removes the 'all or nothing' trap and lets them feel successful with 15 minutes. That shift from guilt to accomplishment improves mental health, not just physical fitness.", why: 'Emotional burden, mechanism, dual benefit (mental + physical)' },
    },
    productivity: {
      poor: { text: 'Productivity matters', why: 'Generic' },
      good: { text: 'Remote workers should work with their biology', why: 'Better - identifies principle' },
      excellent: { text: "Remote work freed people from offices but trapped them in '8 productive hours' expectations. This app validates that working with your rhythms is not laziness - it is sustainability. It reduces burnout and restores a healthier relationship with work.", why: 'Context (remote work), reframes laziness, sustainability, relationship with work' },
    },
    social: {
      poor: { text: 'Reading is better with others', why: 'Generic' },
      good: { text: 'Readers deserve community without the scheduling burden', why: 'Identifies benefit' },
      excellent: { text: "Reading is often solitary, but discussion deepens understanding and connection. This app brings that benefit to people who cannot commit to traditional clubs. It proves that meaningful community can be async - and that matters for busy lives.", why: 'Why discussion matters, who benefits, async community possibility' },
    },
    finance: {
      poor: { text: 'Money management matters', why: 'Generic' },
      good: { text: 'People should know where their money goes', why: 'Identifies principle' },
      excellent: { text: "Subscription creep drains budgets silently. This app makes recurring spend visible without manual work - so people can take back control. Financial clarity should not require spreadsheets or hours of categorization.", why: 'Problem (subscription creep), mechanism (visibility), effort constraint' },
    },
    education: {
      poor: { text: 'Exams are important', why: 'Generic' },
      good: { text: 'Medical students need both recall and application', why: 'Identifies dual need' },
      excellent: { text: "Medical education tests recall and application. Students who only memorize struggle on real exams. This app bridges that gap in one workflow - so they study smarter, not harder, and enter practice better prepared.", why: 'Dual exam demand, failure of recall-only, integration benefit, outcome' },
    },
    creative: {
      poor: { text: 'Writing is valuable', why: 'Generic' },
      good: { text: 'First drafts need to exist before they can be edited', why: 'Identifies sequencing' },
      excellent: { text: "Countless stories stay unwritten because perfectionism blocks the first draft. This app validates that messy output is progress. Finishing a bad draft is the first step to publishing a good book - and that shift matters for aspiring authors.", why: 'Perfectionism cost, reframe (messy = progress), sequencing, outcome' },
    },
  },
}

export function hasExamplesForField(fieldId: string): boolean {
  return fieldId in exampleLibrary
}
