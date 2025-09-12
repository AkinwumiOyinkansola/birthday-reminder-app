const cron = require('node-cron');
const User = require("../models/User");
const transporter = require('../config/mailer')
const getRandomTemplate = require('../utils/emailTemplates')

cron.schedule("0 7 * * *", async () => {
    console.log("Running Birthday Job...");

    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();

    try {
        const users = await User.find();

        for(let user of users) {
            const userDob = new Date(user.dob);
            if (userDob.getMonth()=== month && userDob.getDate()=== day)
            {
                const message = getRandomTemplate(user.username);
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: "Happy Birthday!",
                    text: message,
                });
                console.log(`Birthday email sent to ${user.email}`);
            }
        }
    } catch (error) {
        console.error("Error in Birthday Job:", error.message);
    }
});