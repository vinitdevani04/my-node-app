const AddModel = require("../model/userModel");

const register = async (req, res) => {
    try {
        const { email, password, contact } = req.body;

        const existingUser = await AddModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const newUser = new AddModel({ email, password, contact });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully",data:user, success: true });
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

        res.status(200).json({ message: "Login successful",data:user, success: true });
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

const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await AddModel.findOneAndDelete({ _id });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { register, login, getAllUser ,deleteUser};