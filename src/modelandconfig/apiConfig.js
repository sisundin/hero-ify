const ClientIdSpotify = "6b81aee6295f4241b1442fd768e26a0e";
const FireBaseCollectionID = "uq5qdkdYhTG3mbdaJtiD";
const heroApiENDPOINT = "https://superheroapi.com/api/"
const HeroApiAccessToken = "10216578763606325/";
const admin = require("firebase-admin");

const serviceAccount = require("src/modelandconfig/hero-ify-firebase-adminsdk-k8ano-b2c3cd553c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hero-ify.firebaseio.com"
});