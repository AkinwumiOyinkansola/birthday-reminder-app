const cron = require("node-cron");
const User = require("../models/User");
const sendEmail = require("../utils/emailService"); 
const getRandomTemplate = require("../utils/emailTemplates"); 

// Birthday reminder job
const birthdayJob = cron.schedule("0 9 * * *", async () => {
  try {
    console.log("🎂 Running birthday job...");

    // Get today's date (MM-DD format)
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // months are 0-indexed
    const todayDate = today.getDate();

    // Fetch all users whose birthday is today
    const users = await User.find();

    for (let user of users) {
      if (!user.dob) continue;

      const dob = new Date(user.dob);
      const dobMonth = dob.getMonth() + 1;
      const dobDate = dob.getDate();

      // Check if today matches user's birthday
      if (dobMonth === todayMonth && dobDate === todayDate) {
        const message = getRandomTemplate(user.username);

        // Send birthday email
        await sendEmail(
          user.email,
          `🎉 Happy Birthday ${user.username}!`,
          message
        );

        console.log(`Birthday email sent to ${user.username} (${user.email})`);
      }
    }
  } catch (error) {
    console.error(" Error running birthday job:", error.message);
  }
});

module.exports = birthdayJob;
