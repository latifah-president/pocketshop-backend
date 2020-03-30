const admin = require("firebase-admin");
admin.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}
 
);

const auth = (req, res, next) => {
  const idToken = req.headers.authorization;
  console.log('idtoken', idToken)
     // verify:
     if (idToken) {
        // verify:
        admin
          .auth()
          .verifyIdToken(idToken)
          .then(decodedIdToken => {
            // verify ok
            console.log("ID Token correctly decoded", decodedIdToken);
            req.user = decodedIdToken;
            return next();
          })
          .catch(error => {
            console.error("Error while verifying Firebase ID token:", error);
            res.status(403).send("Unauthorized");
          });
      } else {
        res.status(401).json({
          message: "Log in and provide token to view this content."
        });

};
}
module.exports = auth