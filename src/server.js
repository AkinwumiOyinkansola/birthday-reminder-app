require("dotenv").config();

const sendEmail = require("./utils/emailService");

sendEmail(process.env.EMAIL_USER, "Test Email", "This is a test email.")
  .then(() => {
    console.log("Email test successful");
  })
  .catch((err) => {
    console.error("Email test failed :", err.message);
  });
const connectDB = require("./config/db");
const app = require("./app");
const emailService = require("./utils/emailService");

// Start DB
connectDB();

// Load cron job
require("./jobs/birthdayJob");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
