const CoinPrice = require('../model/coinPriceModel');
const axios = require('axios');

const createOrUpdateCoinPrice = async (req, res) => {
    try {
        const { network, coin, price } = req.body;
        const existingCoinPrice = await CoinPrice.findOne({ network, coin });
        if (existingCoinPrice) {
            existingCoinPrice.price = price;
            existingCoinPrice.lastUpdated = new Date();
            await existingCoinPrice.save();
            return res.status(200).json({ message: "Coin price updated successfully", data: existingCoinPrice });
        }

        const newCoinPrice = new CoinPrice({ network, coin, price });
        await newCoinPrice.save();
        res.status(201).json({ message: "Coin price created successfully", data: newCoinPrice });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getCoinPrices = async (req, res) => {
    try {
        const coinPrices = await CoinPrice.find();
        res.status(200).json({ data: coinPrices });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const compareCoinPrices = async (req, res) => {
    try {
        const coinPrices = await CoinPrice.find();
        const livePrices = {};

        // Fetch live prices from CoinGecko
        for (const coinPrice of coinPrices) {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinPrice.coin.toLowerCase()}&vs_currencies=usd`);
            livePrices[coinPrice.coin] = response.data[coinPrice.coin.toLowerCase()].usd;
        }

        // Compare stored prices with live prices
        const comparison = coinPrices.map(coinPrice => ({
            network: coinPrice.network,
            coin: coinPrice.coin,
            storedPrice: coinPrice.price,
            livePrice: livePrices[coinPrice.coin],
            difference: livePrices[coinPrice.coin] - coinPrice.price
        }));

        res.status(200).json({ data: comparison });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { createOrUpdateCoinPrice, getCoinPrices, compareCoinPrices };