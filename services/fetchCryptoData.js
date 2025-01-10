const axios = require("axios")
const Crypto = require("../models/cryptoModel");

const fetchCryptoData = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,matic-network',
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
      },
    });

    const cryptoData = response.data;
    // console.log("Crypto data", cryptoData)
    for (const crypto of cryptoData) {
      console.log(`Fetched data for ${crypto.id}:`, {
        price: crypto.current_price,
        marketCap: crypto.market_cap,
        change24h: crypto.price_change_percentage_24h,
      });

      const newEntry = new Crypto({
        coinId: crypto.id,
        price: crypto.current_price,
        marketCap: crypto.market_cap,
        change24h: crypto.price_change_percentage_24h,
      });
      await newEntry.save();
    }
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error.message);
  }
};

module.exports = fetchCryptoData;