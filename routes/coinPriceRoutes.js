const express = require('express');
const router = express.Router();
const { createOrUpdateCoinPrice, getCoinPrices} = require('../controller/coinPriceController');

router.post('/coinPrice', createOrUpdateCoinPrice);

router.get('/coinPrices', getCoinPrices);

module.exports = router;