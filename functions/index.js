import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { defineString } from 'firebase-functions/params'
import * as admin from 'firebase-admin'
import nodemailer from 'nodemailer'

admin.initializeApp()

const recipientEmail = defineString('FEEDBACK_EMAIL', { default: 'liquidgolf@gmail.com' })
const gmailUser = defineString('GMAIL_USER')
const gmailAppPassword = defineString('GMAIL_APP_PASSWORD')

/**
 * When a document is created in the feedback collection, send its contents
 * to the configured recipient (liquidgolf@gmail.com by default).
 * Requires GMAIL_USER and GMAIL_APP_PASSWORD to be set (Firebase config or .env).
 */
export const sendFeedbackEmail = onDocumentCreated(
  { document: 'feedback/{feedbackId}', region: 'us-central1' },
  async (event) => {
    const snap = event.data
    if (!snap) return

    const data = snap.data()
    const text = data.text || '(no text)'
    const userEmail = data.userEmail || '(not provided)'
    const userId = data.userId || '(anonymous)'
    const createdAt = data.createdAt || new Date().toISOString()

    const to = recipientEmail.value()
    const user = gmailUser.value()
    const pass = gmailAppPassword.value()

    if (!user || !pass) {
      console.warn('sendFeedbackEmail: GMAIL_USER or GMAIL_APP_PASSWORD not set; skipping email')
      return
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user, pass },
    })

    const subject = `SnaapMap feedback from ${userEmail}`
    const html = `
      <p><strong>Feedback:</strong></p>
      <p>${escapeHtml(text)}</p>
      <p><strong>From:</strong> ${escapeHtml(userEmail)}</p>
      <p><strong>User ID:</strong> ${escapeHtml(userId)}</p>
      <p><strong>Time:</strong> ${escapeHtml(createdAt)}</p>
    `

    try {
      await transporter.sendMail({
        from: user,
        to,
        subject,
        html,
        text: `Feedback: ${text}\nFrom: ${userEmail}\nUser ID: ${userId}\nTime: ${createdAt}`,
      })
    } catch (err) {
      console.error('sendFeedbackEmail failed:', err)
      throw err
    }
  }
)

function escapeHtml(s) {
  if (typeof s !== 'string') return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
