const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.setCustomClaims = functions.https.onCall(async (data, context) => {
  const { uid, name, phone } = data;

  if (context.auth) {
    await admin.auth().setCustomUserClaims(uid, { name, phone });
    return { status: "success" };
  } else {
    throw new functions.https.HttpsError("unauthenticated", "User not authenticated");
  }
});

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  const createdAt = new Date().toISOString();

  // Read custom claims
  const { name, phone } = user.customClaims;

  return admin.firestore().collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    displayName: name,
    phoneNumber: phone,
    role: "user",
    createdAt: createdAt,
    updatedAt: createdAt,
    favorites: [],
    ads: [],
    // Add any other required fields with default values
  });
});
