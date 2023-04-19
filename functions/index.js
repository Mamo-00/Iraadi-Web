const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { initializeApp } = require("firebase-admin/app");

initializeApp();

async function createUserDocument(user, name, phone) {
  try {
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
      searches: [],
      // Add any other required fields with default values
    });
  } catch (error) {
    console.error("Error creating user document:", error);
  }
}

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
  return createUserDocument(user, user.displayName, user.phoneNumber);
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

    // Create user document
    await createUserDocument(userRecord, name, phone);

    return { uid: userRecord.uid };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error.message);
  }
});

