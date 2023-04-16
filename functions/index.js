const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { initializeApp } = require("firebase-admin/app");
initializeApp();

exports.setCustomClaims = functions.https.onCall(async (data, context) => {
  const { uid, name, phone } = data;

  console.log("setCustomClaims data:", data);

  if (context.auth) {
    console.log("setCustomClaims: setting custom claims for uid:", uid);
    await admin.auth().setCustomUserClaims(uid, { name, phone });
    console.log("setCustomClaims: custom claims set for uid:", uid);
    return { status: "success" };
  } else {
    throw new functions.https.HttpsError("unauthenticated", "User not authenticated");
  }
});

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  try {
    // Fetch user record to get custom claims
    const userRecord = await admin.auth().getUser(user.uid);
    const { name, phone } = userRecord.customClaims;

    console.log("createUserDocument user:", userRecord);
    console.log("createUserDocument customClaims:", userRecord.customClaims);

    const createdAt = new Date().toISOString();

    return admin.firestore().collection("users").doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: user.photoURL,
      phoneNumber: phone,
      role: "user",
      createdAt: createdAt,
      updatedAt: createdAt,
      favorites: [],
      ads: [],
      // Add any other required fields with default values
    });
  } catch (error) {
    console.error("Error creating user document:", error);
  }
});

exports.createUserWithEmailPassword = functions.https.onCall(async (data, context) => {
  const { email, password, name, phone } = data;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Set custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { name, phone });

    return { uid: userRecord.uid };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error.message);
  }
});
