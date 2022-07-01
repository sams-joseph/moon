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
  .schedule("every 1 hours")
  .onRun((context) => {
    db.collection("coins")
      .doc("TEST")
      .set({ id: "TEST", symbol: "TEST", name: "testing" });
    return null;
  });
