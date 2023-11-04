const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const cors = require("cors");
const Joi = require("joi");

const storage = new Storage();

const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");

initializeApp();

const corsHandler = cors({
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
});

// Validation schemas
const createUserDocumentSchema = Joi.object({
  user: Joi.object({
    uid: Joi.string().required(),
    email: Joi.string().email().required(),
    photoURL: Joi.string().uri().allow(null, ""),
    displayName: Joi.string().allow(null, ""),
    phoneNumber: Joi.string().allow(null, ""),
  }).required(),
  name: Joi.string().allow(null, ""),
  phone: Joi.string().allow(null, ""),
});

const setCustomClaimsSchema = Joi.object({
  uid: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
});

const createUserWithEmailPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
});

const createAdSchema = Joi.object({
  ad: Joi.object().required(),
  collectionName: Joi.string().required(),
});

const createAdDocumentSchema = Joi.object({
  ad: Joi.object().required(),
  uid: Joi.string().required(),
  collectionName: Joi.string().required(),
});

const adsSchema = Joi.object({
  Condition: Joi.string().required(),
  "Date Listed": Joi.date().required(),
  Description: Joi.string().required(),
  Images: Joi.array().items(Joi.string()).required(),
  Location: Joi.string().required(),
  uid: Joi.string().required(),
  Price: Joi.number().required(),
  Title: Joi.string().required(),
  id: Joi.string().required(),
  Negotiable: Joi.string().required(),
});

const carAdSchema = Joi.object({
  "Accident History": Joi.boolean().required(),
  "Body Type": Joi.string().required(),
  Color: Joi.string().required(),
  Condition: Joi.string().required(),
  "Date Listed": Joi.date().required(),
  Description: Joi.string().required(),
  Doors: Joi.number().required(),
  "Drive Type": Joi.string().required(),
  "Engine Size": Joi.number().required(),
  "Expiration Date": Joi.date().required(),
  "Fuel Type": Joi.string().required(),
  Gearbox: Joi.string().required(),
  Images: Joi.array().items(Joi.string()).required(),
  "License Plate": Joi.string().required(),
  Location: Joi.string().required(),
  Make: Joi.string().required(),
  Mileage: Joi.string().required(),
  Model: Joi.string().required(),
  "Number of Owners": Joi.number().required(),
  uid: Joi.string().required(),
  Price: Joi.number().required(),
  Seats: Joi.string().required(),
  Title: Joi.string().required(),
  VIN: Joi.string().required(),
  Warranty: Joi.string().required(),
  Year: Joi.string().required(),
  Negotiable: Joi.string().required(),
  id: Joi.string().required(),
});

const propertyAdSchema = Joi.object({
  Title: Joi.string().required(),
  Bedrooms: Joi.number().required(),
  Bathrooms: Joi.number().required(),
  Images: Joi.array().items(Joi.string()).required(),
  uid: Joi.string().required(),
  Price: Joi.number().required(),
  Area: Joi.number().required(),
  Description: Joi.string().required(),
  Facilities: Joi.array().items(Joi.string()).required(),
  Location: Joi.string().required(),
  Negotiable: Joi.string().required(),
  Rooms: Joi.number().required(),
  Type: Joi.string().required(),
  "Real Estate Agent": Joi.string().required(),
  "Sale or Rent": Joi.string().required(),
});

// Define the jobAds schema
const jobAdsSchema = Joi.object({
  "Document ID": Joi.string().required(), // Assuming this is a string and required
  "Contact Info": Joi.string().required(), // Assuming this is a string and required
  Description: Joi.string().required(),
  Education: Joi.string().required(), // Assuming this is a string and required
  "Employment Type": Joi.string().required(),
  Experience: Joi.string().required(), // Assuming this is a string and required
  Salary: Joi.alternatives()
    .try(
      Joi.object({
        Negotiable: Joi.string().required(),
        max: Joi.number().optional(),
        min: Joi.number().optional(),
      }),
      Joi.object({
        Negotiable: Joi.string().optional(),
        max: Joi.number().required(),
        min: Joi.number().required(),
      })
    )
    .required(),
  Title: Joi.string().required(),
  Workplace: Joi.string().required(), // Assuming this is a string and required
  categoryId: Joi.string().required(),
  id: Joi.string().required(),
  subcategoryId: Joi.string().required(),
  subsubcategoryId: Joi.string().allow(null, ""), // Allowing null or empty string
}).required();

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
  const { error } = setCustomClaimsSchema.validate(data);
  if (error) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      error.details[0].message
    );
  }

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
    const { error } = createUserWithEmailPasswordSchema.validate(data);
    if (error) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        error.details[0].message
      );
    }

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
  const { error } = createAdDocumentSchema.validate({
    ad,
    uid,
    collectionName,
  });
  if (error) {
    console.log(
      "Validation error in createAdDocument:",
      error.details[0].message
    );
    return;
  }

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
  const { error } = createAdSchema.validate(data);
  if (error) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      error.details[0].message
    );
  }

  let schema;
  switch (data.collectionName) {
    case "ads":
      schema = adsSchema;
      break;
    case "carAds":
      schema = carAdSchema;
      break;
    case "propertyAds":
      schema = propertyAdSchema;
      break;
    // ... other cases
    default:
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid collection name"
      );
  }

  const { error: adError } = schema.validate(data.ad);
  if (adError) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      adError.details[0].message
    );
  }

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

// Firebase Cloud Function for getting filtered ads
exports.getFilteredAds = functions.https.onCall(async (data, context) => {
  try {
    const {
      Location,
      Condition,
      Usage,
      Negotiable,
      minPrice,
      maxPrice,
      lastVisible,
    } = data;
    console.log(
      "filters in getFilteredAds:",
      Location,
      Condition,
      Usage,
      Negotiable,
      minPrice,
      maxPrice
    );
    console.log("last visible:", lastVisible);
    const pageSize = 4;
    let query = admin.firestore().collection("ads").limit(pageSize);

    // Manually apply filters
    const orderByFields = []; // Keep track of fields used in orderBy
    // Initialize startAfterValues as an empty array
    let startAfterValues = [];
    if (Location) {
      query = query.where("Location", "==", Location);
      orderByFields.push("Location");
    }
    if (Condition) {
      query = query.where("Condition", "==", Condition);
      orderByFields.push("Condition");
    }
    if (Usage) {
      query = query.where("Usage", "==", Usage);
      orderByFields.push("Usage");
    }
    if (Negotiable !== null) { // Only apply the filter if Negotiable is explicitly true or false
      query = query.where("Negotiable", "==", Negotiable);
      orderByFields.push("Negotiable");
    }
    if (minPrice !== null) {
      // Check for minPrice and adjust the query
      query = query.where("Price", ">=", minPrice);
      // It's important to only push "Price" to orderByFields once.
      if (!orderByFields.includes("Price")) {
        orderByFields.push("Price");
      }
    }

    if (maxPrice !== null) {
      // Check for maxPrice and adjust the query
      query = query.where("Price", "<=", maxPrice);
      // No need to push "Price" again if it's already there.
      if (!orderByFields.includes("Price")) {
        orderByFields.push("Price");
      }
    }

    // Check if all filters are undefined or null
    if (
      !Location &&
      !Condition &&
      !Usage &&
      !Negotiable &&
      minPrice === null &&
      maxPrice === null
    ) {
      // Populate orderByFields with all the fields
      orderByFields.push(
        "Location",
        "Condition",
        "Usage",
        "Negotiable",
        "Price"
      );
    }
    // Apply orderBy based on orderByFields
    orderByFields.forEach((field) => {
      // If we're ordering by price, we need to specify the direction.
      // Assuming you want to order from low to high price.
      if (field === "Price") {
        query = query.orderBy(field, "asc");
      } else {
        // Make sure to only add orderBy for other fields if Price is not being used as an inequality filter
        // or if it's already been added as the first orderBy field.
        if (
          !orderByFields.includes("Price") ||
          orderByFields.indexOf("Price") < orderByFields.indexOf(field)
        ) {
          query = query.orderBy(field);
        }
      }
    });

    const filteredLastVisible = {};
    if (lastVisible) {
      orderByFields.map((field) => {
        filteredLastVisible[field] = lastVisible[field];
      });
    }

    // Check if lastVisible is not null before mapping
    if (lastVisible) {
      startAfterValues = orderByFields.map((field) => {
        return filteredLastVisible[field];
      });
    }

    console.log("orderByFields:", orderByFields);
    console.log("startAfterValues:", startAfterValues);

    // Manually apply pagination using startAfter
    if (
      lastVisible &&
      startAfterValues.every((value) => value !== undefined && value !== null)
    ) {
      console.log("startAfterValues2:", startAfterValues);
      query = query.startAfter(...startAfterValues);
    }

    const snapshot = await query.get();
    const ads = snapshot.docs.map((doc) => doc.data());
    const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
    const newLastVisible = lastVisibleDoc
      ? { id: lastVisibleDoc.id, ...lastVisibleDoc.data() }
      : null;

    return { status: "success", ads, lastVisible: newLastVisible };
  } catch (error) {
    console.log("Error: ", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});


exports.getAds = functions.https.onCall(async (data, context) => {
  try {
    const { lastVisible } = data;
    const pageSize = 4;
    let query = admin.firestore().collection("ads").orderBy("Status").limit(pageSize);

    if (lastVisible) {
      query = query.startAfter(lastVisible);
    }

    const snapshot = await query.get();
    const ads = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    const lastVisibleAd = snapshot.docs[snapshot.docs.length - 1];

    return { ads, lastVisible: lastVisibleAd };
  } catch (error) {
    console.log("Error: ", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
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
  .document("ads/{id}")
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
  .document("cars/{id}")
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
  .document("property/{id}")
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
  .document("jobs/{id}")
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
    console.log("functions", categories);
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
