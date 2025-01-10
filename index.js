const express = require("express");
const cron = require("node-cron");
const app = express();

const database = require("./config/database");
const fetchCryptoData = require("./services/fetchCryptoData");
const cryptoRoutes =  require("./routes/cryptoRoutes");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
database.connect();

app.use(express.json());

cron.schedule('0 */2 * * *', () => {
  console.log('Running scheduled job: Fetching crypto data...');
  fetchCryptoData();
});

app.use('/api', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});