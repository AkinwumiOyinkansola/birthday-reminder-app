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

This project is open-source and available under the MIT License and is LIVE on https://birthday-reminder-app-z0n7.onrender.com
