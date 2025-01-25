const Users = require("../model/userModel");
const Config = require('../model/configModel'); // Adjust the path based on your file structure

const register = async (req, res) => {
    try {
        const { email, contact, password } = req.body;

        // Validate input
        if (!email || !contact || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Fetch the welcome bonus from configuration
        const config = await Config.findOne();
        const welcomeBonus = config ? config.welcomeBonus : 0; // Default to 0 if no config is found

        // Create a new user
        const newUser = new Users({
            email,
            contact,
            password, // Ideally hash the password before saving
            totalWalletAmount: welcomeBonus, // Apply the welcome bonus
        });

        await newUser.save();
        res.status(200).json({
            message: 'User registered successfully. Welcome bonus added to your wallet!',
            user: {
                id: newUser._id,
                email: newUser.email,
                contact: newUser.contact,
                totalWalletAmount: newUser.totalWalletAmount,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changeWelcomeBonus = async (req, res) => {
    try {
        const { welcomeBonus } = req.body;

        if (typeof welcomeBonus !== 'number' || welcomeBonus < 0) {
            return res.status(400).json({ message: 'Invalid bonus amount. It must be a positive number.' });
        }

        // Check if a configuration document exists
        let config = await Config.findOne();
        if (!config) {
            // Create a new configuration document if it doesn't exist
            config = new Config({ welcomeBonus });
        } else {
            // Update the existing configuration document
            config.welcomeBonus = welcomeBonus;
        }

        await config.save();
        res.status(200).json({
            message: 'Welcome bonus updated successfully.',
            welcomeBonus: config.welcomeBonus,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const walletUpdate = async (req, res) => {
    try {
        const { email, walletAmount } = req.body;

        if (!email || walletAmount === undefined) {
            return res.status(400).json({ message: "Email and walletAmount are required.", success: false });
        }
        const existingUser = await Users.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        existingUser.totalWalletAmount = walletAmount;
        await existingUser.save();

        // Respond with the updated user details
        res.status(200).json({
            message: "Wallet amount updated successfully.",
            success: true,
            updatedUser: {
                email: existingUser.email,
                totalWalletAmount: existingUser.totalWalletAmount
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        res.status(200).json({ message: "Login successful", data: user, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllUser = async (req, res) => {
    try {
        const allUsers = await Users.find();
        res.status(200).json({ data: allUsers });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { _id } = req.body;

        const user = await Users.findOneAndDelete({ _id });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { register, login, getAllUser, deleteUser, walletUpdate, changeWelcomeBonus };
