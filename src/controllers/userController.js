const User = require('../models/User');
//const User = require('../models/User');
console.log("Loaded User model:", User);

//Add new user

exports.addUser = async (req, res) => {
    try {
        const {username, email, dob} = req.body
        if(!username || !dob || !email) {
            return res.status(400).json({sucess: false, message: "All fields are required!"})
        }
        const user = new User({username, email, dob});
        await user.save();

        res.status(201).json({success: true, messsage: "User added successfully"})
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ success: false, message: error.message});
    }
};

//Get all users
exports.getUsers = async (req, res)=> {
    try {
        const allUsers = await User.find();
        res.json(allUsers).status(200)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({success: false, message: error.message})
    }

}