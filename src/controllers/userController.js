const User = require("../models/User");
const sendEmail = require("../utils/emailService");

// Add new user
exports.addUser = async (req, res) => {
  try {
    const { username, email, dob } = req.body;

    // 1. Validate inputs
    if (!username || !dob || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists!",
      });
    }

    // 3. Create and save new user
    const user = new User({ username, email, dob });
    await user.save();

    // 4. Send welcome email
    try {
      await sendEmail(
        email,
        "Welcome to Birthday Reminder App 🎉",
        `Hi ${username}, welcome to the Birthday Reminder App! 🎂`
    );
      console.log(`Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError.message);
      // Don’t block user creation just because email failed
    }

    // 5. Respond with success
    res.status(201).json({
      success: true,
      message: "User added successfully and welcome email sent!",
      user,
    });
    

  } catch (error) {
    console.error("❌ Error adding user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

