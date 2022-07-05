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
        return null;
      });
  });

// Run every day to update coin info
exports.updateCoinInfo = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    const docRefs = await db.collection("coins").listDocuments();
    const ids = docRefs.map((it) => it.id);

    axios
      .get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info`, {
        params: { symbol: ids.join(",") },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_KEY,
        },
      })
      .then((res) => {
        Object.keys(res.data.data).forEach((key) => {
          const coin = res.data.data[key][0];
          db.collection("coin_metas").doc(coin.symbol).set(coin);
        });
        return null;
      })
      .catch((err) => {
        return null;
      });
  });

exports.updateSummary = functions.firestore
  .document("transactions/{transactionId}")
  .onCreate(async (snap, context) => {
    const newValue = snap.data();
    const docRef = db.collection("wallets").doc(newValue.uid);
    const summary = await db.collection("wallets").doc(newValue.uid).get();
    if (summary.exists) {
      const doc = summary.data();
      let newSummary = {
        [newValue.coin.symbol]: {
          total: Number(newValue.amount),
          balance: Number(newValue.price),
        },
      };
      if (newValue.transaction_type === "buy") {
        const newTotal = doc[newValue.coin.symbol]
          ? Number(doc[newValue.coin.symbol].total) + Number(newValue.amount)
          : Number(newValue.amount);
        const newBalance = doc[newValue.coin.symbol]
          ? Number(doc[newValue.coin.symbol].balance) +
            Number(newValue.price * newValue.amount)
          : Number(newValue.price * newValue.amount);
        newSummary = {
          [newValue.coin.symbol]: {
            total: newTotal,
            balance: newBalance,
          },
        };
      } else {
        const newTotal = doc[newValue.coin.symbol]
          ? Number(doc[newValue.coin.symbol].total) - Number(newValue.amount)
          : -Number(newValue.amount);
        const newBalance = doc[newValue.coin.symbol]
          ? Number(doc[newValue.coin.symbol].balance) -
            Number(newValue.price * newValue.amount)
          : -Number(newValue.price * newValue.amount);
        newSummary = {
          [newValue.coin.symbol]: {
            total: newTotal,
            balance: newBalance,
          },
        };
      }

      docRef.update(newSummary);
    } else {
      const newSummary = {
        [newValue.coin.symbol]: {
          total: Number(newValue.amount),
          balance: Number(newValue.price) * Number(newValue.amount),
        },
      };

      docRef.set(newSummary);
    }

    return null;
  });
