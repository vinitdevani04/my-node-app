const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
    welcomeBonus: {
        type: Number,
        default: 100, // Default welcome bonus
    },
});

module.exports = mongoose.model('Config', ConfigSchema);
