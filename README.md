🎂 Birthday Reminder App

A simple Node.js + Express.js application that helps you remember birthdays and send automated email reminders using Nodemailer + Gmail SMTP.

This project demonstrates:

📧 Sending emails via Gmail SMTP with Nodemailer

🗄️ MongoDB database integration

⏰ Automated background jobs with node-cron

🔒 Secure environment configuration using .env

🏗️ Clean code structure (services, jobs, routes, config)

🚀 Features

Add users and their birthdays to MongoDB.

Automatically send birthday emails using cron jobs.

Reusable email service powered by Nodemailer.

Configurable via .env file (no secrets in code).

Runs on Express.js with a simple REST API.

🛠️ Tech Stack

Node.js – Backend runtime

Express.js – Web framework

MongoDB Atlas – Cloud database

Mongoose – ODM for MongoDB

Nodemailer – Email sending service

node-cron – Scheduled jobs

dotenv – Secure environment variables

📂 Project Structure
birthday-reminder-app/
│── src/
│   ├── app.js              # Express app setup
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── jobs/
│   │   └── birthdayJob.js  # Cron job for sending reminders
│   ├── models/
│   │   └── User.js         # User schema (name, email, birthday)
│   ├── utils/
│   │   └── emailService.js # Nodemailer email service
        └── emailTemplates.js #Nodemail email template
│   ├── routes/
│   │   └── userRoutes.js   # API routes for users
│   └── server.js           # Entry point
│   └── app.js              # Express applicaton
├── .env                    # Environment variables
|── .gitignore              # Gitignore
├── package.json
└── README.md

⚙️ Installation
1. Clone the repository
git clone https://github.com/yourusername/birthday-reminder-app.git
cd birthday-reminder-app

2. Install dependencies
npm install

3. Create a .env file in the root folder
PORT=3000
MONGODB_URI=your_mongodb_connection_string

# Gmail SMTP credentials
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password


⚠️ Important:

EMAIL_PASS must be a Google App Password, not your Gmail login password.
Follow this guide
 to generate one.

▶️ Running the Project

Start the development server:

npm run dev


Or run normally:

npm start


Your server will be running on:

http://localhost:3000

📧 Sending a Test Email

Inside server.js, there’s a test snippet:

const sendEmail = require("./services/emailService");

sendEmail(process.env.EMAIL_USER, "Test Email", "This is a test email.")
  .then(() => console.log("Email test successful ✅"))
  .catch((err) => console.error("Email test failed ❌:", err.message));


✅ This sends a test email to your own Gmail address defined in .env.

⏰ Cron Job

The birthdayJob.js runs daily at 9:00 AM and:

Checks MongoDB for users with birthdays today.

Sends them an automated birthday greeting email.

You can configure the schedule in:

const cron = require("node-cron");

// Runs every day at 9 AM
cron.schedule("0 9 * * *", () => {
  console.log("🎉 Running birthday reminder job...");
  // logic to send birthday emails
});

📌 Example API Usage
Create a User
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "birthday": "1995-09-12"
}

Get All Users
GET /api/users

🐞 Common Issues

Error: Invalid login / username not defined

Ensure EMAIL_USER and EMAIL_PASS are set in .env.

Restart the server after changes.

Address not found (example.com)

Replace yourpersonalemail@example.com with a real email address.

Blocked sign-in attempt by Google

Make sure you are using an App Password, not your Gmail password.

📝 License

This project is open-source and available under the MIT License
.

Would you like me to also include a step-by-step walkthrough (word by word) in the README for beginners (like you asked with code explanations before), or do you want to keep it more professional and concise for GitHub/portfolio use?

You said:
how do i get paystack secret key and callback url for the restaurant chatbot
ChatGPT said:

Great — here’s a complete, practical guide on how to get your Paystack secret key and set a callback URL for your Restaurant ChatBot, plus everything you need to integrate, test locally (ngrok), and secure your flow. I’ll include exact steps, sample payloads and minimal Node.js code you can paste into your project.

1) Get your Paystack secret key (test & live)

Go to https://dashboard.paystack.com
 and sign in (create an account if you don’t have one).

In the Dashboard, open the left menu → Settings → API keys & Webhooks (or Developers → API keys depending on UI changes).

You’ll see two modes: Test and Live.

Use Test Secret Key while developing. It looks like sk_test_xxx....

When you go to production, switch to Live Secret Key (sk_live_xxx...).

Copy the Secret Key (never commit it to Git). Put it into your .env:

PAYSTACK_SECRET_KEY=sk_test_xxxYOURKEYHERE
PAYSTACK_CALLBACK_URL=https://yourdomain.com/paystack/callback

2) What the Callback URL is and where to set it

Callback URL (also called redirect/callback) is the URL Paystack redirects the user to after payment. It’s passed in the initialization payload (callback_url) or set in the dashboard for webhooks.

For a typical flow:

You call Paystack’s initialize endpoint from server; Paystack returns authorization_url.

You redirect the customer to that authorization_url. After payment, Paystack redirects browser to the callback_url you provided (it adds reference=... query).

Put your server callback route in .env as PAYSTACK_CALLBACK_URL. Example:

PAYSTACK_CALLBACK_URL=https://yourdomain.com/paystack/callback


If you want real-time server-side confirmations (recommended) also configure Webhooks in the Paystack dashboard: Settings → Webhooks, and set your webhook URL (requires HTTPS).

3) Local development: use ngrok to expose localhost

Paystack needs an HTTPS callback/webhook. For local dev:

Install ngrok: https://ngrok.com

Run it on your server port, e.g. 3000:

ngrok http 3000


ngrok provides a public HTTPS URL like https://abc123.ngrok.io. Use that as your callback/webhook in Paystack or in the initialize call:

PAYSTACK_CALLBACK_URL=https://abc123.ngrok.io/paystack/callback


Now Paystack can redirect/POST to your locally running server.

4) Initialize a Paystack transaction (server-side best practice)

Always initialize the transaction from your server using your secret key. Example Node.js (axios):

// src/routes/paystack.js (example)
const axios = require("axios");
const express = require("express");
const router = express.Router();

router.post("/init", async (req, res, next) => {
  try {
    const { amountNaira, email, callbackUrl } = req.body;
    // Paystack expects amount in kobo (Naira * 100)
    const payload = {
      amount: Math.round(amountNaira * 100),
      email,
      callback_url: callbackUrl || process.env.PAYSTACK_CALLBACK_URL,
      // optional: metadata, currency, reference overrides
    };

    const resp = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // resp.data.data.authorization_url -> redirect the user to this URL
    return res.json({ authorization_url: resp.data.data.authorization_url, reference: resp.data.data.reference });
  } catch (err) {
    next(err);
  }
});

module.exports = router;


Important:

amount must be in kobo (Naira × 100).

Use server-side secret key only (never send secret to browser).

5) Verifying payment after redirect (or via server verify endpoint)

After user completes payment Paystack redirects to your callback with ?reference=.... Always verify the transaction server-side (do not trust client).

Example verify call:

// verify endpoint
router.get("/verify", async (req, res, next) => {
  try {
    const { reference } = req.query;
    const resp = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });

    // resp.data.data.status === "success" -> payment confirmed
    const status = resp.data.data.status;
    return res.json({ status, data: resp.data.data });
  } catch (err) {
    next(err);
  }
});


Use the returned status to update order (pending → paid). Save reference in DB when you initialized the transaction, so you can correlate.

6) Webhooks (recommended for reliability)

Webhooks are server-to-server notifications Paystack sends to your webhook URL whenever events (like successful payment) occur. This is more reliable than redirect alone (user might close the browser).

In the Paystack dashboard Developers → Webhooks, add your HTTPS endpoint (eg. https://abc123.ngrok.io/paystack/webhook).

Paystack signs webhook payload; verify signature on your server:

Example webhook handler with signature verification:

// src/routes/paystackWebhook.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");

router.post("/webhook", express.json(), (req, res) => {
  const signature = req.headers["x-paystack-signature"] || "";
  const secret = process.env.PAYSTACK_SECRET_KEY; // still used to compute HMAC
  const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(req.body)).digest("hex");

  if (hash !== signature) {
    console.warn("⚠️ Paystack webhook signature mismatch");
    return res.status(400).send("Invalid signature");
  }

  const event = req.body;
  // handle event: e.g., event.event === "charge.success"
  if (event.event === "charge.success") {
    const reference = event.data.reference;
    // mark corresponding order as paid in your DB
  }

  // respond quickly
  res.status(200).send("ok");
});

module.exports = router;


Note: some docs recommend using PAYSTACK_SECRET_KEY for HMAC; confirm with Paystack docs. (Paystack includes x-paystack-signature on webhook POSTs.)

7) Callback route (browser redirect)

Your callback route can display a friendly message and call your server-side verify endpoint:

Example route handler:

// GET /paystack/callback?reference=xxx
app.get("/paystack/callback", async (req, res) => {
  const { reference } = req.query;
  // call your verify endpoint or do server-side verify here
  // then redirect user to a UI page (order success/failure)
  res.redirect(`/payment-result?reference=${reference}`);
});


Then your frontend can poll /paystack/verify?reference=... to render order status.

8) Security & best practices

Never expose secret keys in frontend code or client-side. Keep in .env and server-only.

Use test keys for dev. Switch to live keys when ready and thoroughly test webhooks.

Validate and compute amount server-side — do not trust client amount.

Store reference and status in DB. Use idempotency: if webhook/verify called twice, handle safely.

Verify webhook signatures before trusting payload.

Use HTTPS for callback/webhook (ngrok for local testing).

9) Quick checklist & snippets

.env:

PAYSTACK_SECRET_KEY=sk_test_xxx...
PAYSTACK_CALLBACK_URL=https://abc123.ngrok.io/paystack/callback


Initialize (server):

POST https://api.paystack.co/transaction/initialize
Headers: Authorization: Bearer <secret>
Body:
{
  "email": "customer@example.com",
  "amount": 500000, // 5000.00 NGN => 500000 kobo
  "callback_url": "https://abc123.ngrok.io/paystack/callback",
  "metadata": { "orderId": "abc123" }
}


Verify (server): GET https://api.paystack.co/transaction/verify/{reference} with Authorization: Bearer <secret>

Webhook header: x-paystack-signature (HMAC SHA512 of body)

10) Example end-to-end flow for your Restaurant ChatBot

User places order via chatbot → server creates order, saves to DB, returns orderIndex.

User sends pay {orderIndex} → server initializes Paystack transaction for that order, returns authorization_url.

Chatbot/Frontend opens the authorization_url for the user to pay.

Paystack redirects the browser to PAYSTACK_CALLBACK_URL?reference=... → your callback calls verify endpoint (or the frontend calls your server verify).

Alternatively, Paystack sends webhook charge.success → your webhook verifies signature and updates order status to paid.

Chatbot shows confirmation to the user.
