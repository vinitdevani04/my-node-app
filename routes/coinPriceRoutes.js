const express = require('express');
const router = express.Router();
const { createOrUpdateCoinPrice, getCoinPrices, compareCoinPrices } = require('../controller/coinPriceController');

// Route to create or update coin price
router.post('/coinPrice', createOrUpdateCoinPrice);

// Route to get all coin prices
router.get('/coinPrices', getCoinPrices);

// Route to compare stored coin prices with live prices
router.get('/compareCoinPrices', compareCoinPrices);

module.exports = router;