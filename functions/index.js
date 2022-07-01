const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
admin.initializeApp();
const db = admin.firestore();

// Create a user document on signup
exports.createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});

// Run every hour to update coin data
exports.updateCoinData = functions.pubsub
  .schedule("every 24 hours")
  .onRun((context) => {
    axios
      .get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
        {
          params: { limit: 100 },
          headers: {
            "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_KEY,
          },
        }
      )
      .then((res) => {
        res.data.data.forEach((coin) => {
          db.collection("coins").doc(coin.symbol).set(coin);
        });
        return null;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  });
