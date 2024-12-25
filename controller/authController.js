const AddModel = require("../model/userModel");

const register = async (req, res) => {
    try {
        const { email, password, contact } = req.body;

        const newUser = new AddModel({ email, password, contact });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AddModel.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        res.status(200).json({ message: "Login successful", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllUser = async (req, res) => {
    try {
        const allUsers = await AddModel.find();
        res.status(200).json({ data: allUsers });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { register, login, getAllUser };