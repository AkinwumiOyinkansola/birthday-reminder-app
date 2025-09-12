require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");

// Start DB
connectDB();

// Load cron job
require("./jobs/birthdayJob");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
