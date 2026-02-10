# SnappMap Cloud Functions

## sendFeedbackEmail

Sends an email to **liquidgolf@gmail.com** (or `FEEDBACK_EMAIL`) whenever a new document is created in the Firestore `feedback` collection.

### Setup

1. Install dependencies: `cd functions && npm install`
2. Set params for Gmail (required for sending):
   - **GMAIL_USER**: your Gmail address (e.g. the one you'll send from)
   - **GMAIL_APP_PASSWORD**: a [Gmail App Password](https://support.google.com/accounts/answer/185833) (not your normal password)

   Set via Firebase CLI (recommended for production):
   ```bash
   firebase functions:config:set feedback.email="liquidgolf@gmail.com"
   # For params (v2), set in Firebase Console > Functions > Configuration, or:
   firebase functions:secrets:set GMAIL_USER
   firebase functions:secrets:set GMAIL_APP_PASSWORD
   ```
   Or for local runs, create `functions/.env`:
   ```
   GMAIL_USER=your@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   FEEDBACK_EMAIL=liquidgolf@gmail.com
   ```

3. Deploy: from project root, `firebase deploy --only functions`

### Requirements

- Firebase Blaze plan (for outbound email).
- Firestore `feedback` collection and rules already deployed so the app can create documents.
