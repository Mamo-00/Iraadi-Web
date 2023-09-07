const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const cors = require("cors")({ origin: true });

const storage = new Storage();

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
    console.log("Error creating user document:", error);
  }
}

exports.setCustomClaims = functions.https.onCall(async (data, context) => {
  const { uid, name, phone } = data;

  const metadata = { resource: { type: "global" } };

  if (context.auth) {
    await admin.auth().setCustomUserClaims(uid, { name, phone });

    return { status: "success" };
  } else {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User not authenticated"
    );
  }
});

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  return createUserDocument(user, user.displayName, user.phoneNumber);
});

exports.createUserWithEmailPassword = functions.https.onCall(
  async (data, context) => {
    const { email, password, name, phone } = data;

    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: name,
        phoneNumber: phone,
      });

      // Set custom claims
      await admin.auth().setCustomUserClaims(userRecord.uid, { name, phone });

      // Create user document
      await createUserDocument(userRecord, name, phone);
      return { uid: userRecord.uid };
    } catch (error) {
      console.error("Error in createUserWithEmailPassword function:", error);
      throw new functions.https.HttpsError("unknown", error.message);
    }
  }
);

async function createAdDocument(ad, uid, collectionName) {
  try {
    const createdAt = new Date().toISOString();

    return admin
      .firestore()
      .collection(collectionName)
      .doc()
      .set({
        ...ad,
        uid: uid,
        createdAt: createdAt,
        updatedAt: createdAt,
        // Add any other required fields with default values
      });
  } catch (error) {
    console.log("Error creating ad document:", error);
  }
}

// Cloud Function to create a new ad
exports.createAd = functions.https.onCall(async (data, context) => {
  const { ad, collectionName } = data;
  const uid = context.auth.uid;

  // Get the user's activity document
  const activityRef = admin.firestore().collection("userActivity").doc(uid);
  const activityDoc = await activityRef.get();

  // Check if the user has already posted the maximum number of ads
  if (activityDoc.exists) {
    const activityData = activityDoc.data();
    const timeSinceLastPost = Date.now() - activityData.lastPost;
    const oneHour = 60 * 60 * 1000;

    // If it's been less than an hour since the last post, and the user has already posted 10 ads, reject the request
    if (timeSinceLastPost < oneHour && activityData.postCount >= 10) {
      throw new functions.https.HttpsError(
        "resource-exhausted",
        "You have reached the maximum number of posts for this time period. Please try again later."
      );
    }
  }

  // If the request was not rejected, create the ad and update the user's activity
  await createAdDocument(ad, uid, collectionName);
  await activityRef.set(
    {
      lastPost: Date.now(),
      postCount: admin.firestore.FieldValue.increment(1),
    },
    { merge: true }
  );

  return { status: "success" };
});


// Cloud Function to reset post counts every hour
/* exports.resetPostCounts = functions.pubsub
  .schedule("every 1 hours")
  .onRun(async (context) => {
    const activityDocs = await admin
      .firestore()
      .collection("userActivity")
      .get();

    // Reset the post count for each user
    const batch = admin.firestore().batch();
    activityDocs.forEach((doc) => {
      batch.update(doc.ref, { postCount: 0 });
    });

    await batch.commit();
  }); */

exports.decrementPostCountOnAdDeletion = functions.firestore
  .document("ads/{adId}")
  .onDelete(async (snap, context) => {
    const adData = snap.data();
    const uid = adData.uid;

    const activityRef = admin.firestore().collection("userActivity").doc(uid);
    const activityDoc = await activityRef.get();

    if (activityDoc.exists) {
      const activityData = activityDoc.data();

      // Check if the postCount is already at 0
      if (activityData.postCount > 0) {
        // Check the type of the ad
        if (adData.type === "regular") {
          await activityRef.update({
            postCount: admin.firestore.FieldValue.increment(-1),
          });
        } else if (adData.type === "premium") {
          await activityRef.update({
            postCount: admin.firestore.FieldValue.increment(-2),
          });
        }
      }
    }
  });

  exports.decrementPostCountOnCarAdDeletion = functions.firestore
  .document("cars/{adId}")
  .onDelete(async (snap, context) => {
    const adData = snap.data();
    const uid = adData.uid;

    const activityRef = admin.firestore().collection("userActivity").doc(uid);
    const activityDoc = await activityRef.get();

    if (activityDoc.exists) {
      const activityData = activityDoc.data();

      // Check if the postCount is already at 0
      if (activityData.postCount > 0) {
        // Check the type of the ad
        if (adData.type === "regular") {
          await activityRef.update({
            postCount: admin.firestore.FieldValue.increment(-1),
          });
        } else if (adData.type === "premium") {
          await activityRef.update({
            postCount: admin.firestore.FieldValue.increment(-2),
          });
        }
      }
    }
  });
  
  exports.decrementPostCountOnPropertyAdDeletion = functions.firestore
  .document("property/{adId}")
  .onDelete(async (snap, context) => {
    const adData = snap.data();
    const uid = adData.uid;

    const activityRef = admin.firestore().collection("userActivity").doc(uid);
    const activityDoc = await activityRef.get();

    if (activityDoc.exists) {
      const activityData = activityDoc.data();

      // Check if the postCount is already at 0
      if (activityData.postCount > 0) {
        // Check the type of the ad
        if (adData.type === "regular") {
          await activityRef.update({
            postCount: admin.firestore.FieldValue.increment(-1),
          });
        } else if (adData.type === "premium") {
          await activityRef.update({
            postCount: admin.firestore.FieldValue.increment(-2),
          });
        }
      }
    }
  });

  exports.decrementPostCountOnJobsAdDeletion = functions.firestore
  .document("jobs/{adId}")
  .onDelete(async (snap, context) => {
    const adData = snap.data();
    const uid = adData.uid;

    const activityRef = admin.firestore().collection("userActivity").doc(uid);
    const activityDoc = await activityRef.get();

    if (activityDoc.exists) {
      const activityData = activityDoc.data();

      // Check if the postCount is already at 0
      if (activityData.postCount > 0) {
        // Check the type of the ad
        if (adData.type === "regular") {
          await activityRef.update({
            postCount: admin.firestore.FieldValue.increment(-1),
          });
        } else if (adData.type === "premium") {
          await activityRef.update({
            postCount: admin.firestore.FieldValue.increment(-2),
          });
        }
      }
    }
  });

// Cloud Function to fetch categories
exports.fetchCategories = functions.https.onCall(async (data, context) => {
  try {
    const categoriesSnapshot = await admin
      .firestore()
      .collection("categories")
      .get();
    const categories = categoriesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log('functions', categories);
    return { status: "success", categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});

// Cloud Function to fetch subcategories
exports.fetchSubcategories = functions.https.onCall(async (data, context) => {
  try {
    const subcategoriesSnapshot = await admin
      .firestore()
      .collection("subcategories")
      .get();
    const subcategories = subcategoriesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return { status: "success", subcategories };
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});

// Cloud Function to fetch sub-subcategories
exports.fetchSubSubcategories = functions.https.onCall(
  async (data, context) => {
    try {
      const subSubcategoriesSnapshot = await admin
        .firestore()
        .collection("sub-subcategories")
        .get();
      const subSubcategories = subSubcategoriesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return { status: "success", subSubcategories };
    } catch (error) {
      console.error("Error fetching sub-subcategories:", error);
      throw new functions.https.HttpsError("unknown", error.message);
    }
  }
);
