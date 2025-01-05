const CoinPrice = require('../model/coinPriceModel');

const createOrUpdateCoinPrice = async (req, res) => {
    try {
        const { coin, price } = req.body;

        const existingCoinPrice = await CoinPrice.findOne({ coin });
        if (existingCoinPrice) {
            existingCoinPrice.price = price;
            await existingCoinPrice.save();
            return res.status(200).json({ message: "Coin price updated successfully", data: existingCoinPrice });
        }

        const newCoinPrice = new CoinPrice({ coin, price });
        await newCoinPrice.save();
        res.status(201).json({ message: "Coin price created successfully", newCoinPrice });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getCoinPrices = async (req, res) => {
    try {
        const coinPrices = await CoinPrice.find();
        res.status(200).json(coinPrices);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { createOrUpdateCoinPrice, getCoinPrices };
