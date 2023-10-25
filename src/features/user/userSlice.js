import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import {
  auth,
  googleProvider,
  facebookProvider,
  emailProvider,
  functions,
  db,
  storage
} from "../../firebase/firebase-config";
import {
  
  signInWithEmailAndPassword,
  getRedirectResult,
  signInWithCredential,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signOut,
  sendPasswordResetEmail,
  updateEmail as updateUserEmail,
  updatePassword as updateUserPassword,
  signInWithRedirect,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { httpsCallable } from "firebase/functions";

import * as Sentry from "@sentry/react";
import imageCompression from 'browser-image-compression';

// This function is a reference to a Firebase Cloud Function 
// that will create a new user with an email and password.
const createUserWithEmailPassword = httpsCallable(
  functions,
  "createUserWithEmailPassword"
);

// This asynchronous Redux action will attempt to sign up 
// a new user with an email and password.
export const signUpWithEmailPassword = createAsyncThunk(
  "user/signUpWithEmailPassword",
  async ({ email, password, name, phone }, { rejectWithValue }) => {
     // Tries to sign up a user with the provided email, password, name, and phone number
    try {
      
      const providers = await fetchSignInMethodsForEmail(auth, email);
      if (providers.length > 0) {
        const providerNames = providers.map((providerId) => {
          switch (providerId) {
            case "google.com":
              return "Google";
            case "facebook.com":
              return "Facebook";
            default:
              return providerId;
          }
        });
        // If an account already exists with the provided email, 
        // it will reject the action with a custom message
        const message = `The email address is already in use by another account with ${
          providerNames.length > 1 ? "these providers: " : "this provider: "
        }${providerNames.join(", ")}. Please use ${
          providerNames.length > 1 ? "one of them" : "it"
        } to sign in.`;

        return rejectWithValue({ message });
      } else {
        // If successful, it will return the new user's data
        const result = await createUserWithEmailPassword({
          email,
          password,
          name,
          phone,
        });
        
        const uid = result.data.uid;
        console.log("User created with UID:", uid);

        // Return the user's data, without signing them in
        return {
          uid,
          email,
          displayName: name,
          phoneNumber: phone,
          // Add any other fields you'd like to return here
        };
      }
    } catch (error) {
      // If an error occurs, it will reject the action with the error message
      // you can see the logs on iiraadi's sentry account
      Sentry.captureException(error);
      console.error("rejectWithValue signUp value:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// This asynchronous Redux action will attempt to sign in 
// a user with an email and password.
export const signInWithEmailPassword = createAsyncThunk(
  "user/signInWithEmailPassword",
  async ({ loginEmail, loginPassword }, { rejectWithValue }) => {
    console.log("email and password sent from Login.jsx:", loginEmail);

   // Tries to sign in a user with the provided email and password
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // If successful, it will return the user's data
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          uid: user.uid,
          email: loginEmail,
          displayName: userData.displayName,
          phoneNumber: userData.phoneNumber,
          photoURL: userData.photoURL,
          role: userData.role,
        };
      }
    } catch (error) {
      // If an error occurs, it will reject the action with the error message
      // you can see the logs on iiraadi's sentry account
      Sentry.captureException(error);
      console.error("rejectWithValue signIn value:", error.message);
      return rejectWithValue("something went wrong with sign in");
    }
  }
);

// This asynchronous Redux action will sign out the current user.
export const signOutUser = createAsyncThunk(
  "user/signOut",
  async (_, { rejectWithValue }) => {
    // Tries to sign out the current user
    try {
      await signOut(auth);
      // If successful, it will return null
      return null;
    } catch (error) {
      // If an error occurs, it will reject the action with the error message
      // you can see the logs on iiraadi's sentry account
      Sentry.captureException(error);
      console.error("rejectwithvalue signOutUser value:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// This asynchronous Redux action will send a 
// password reset email to the provided email.
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, { rejectWithValue }) => {
    // Tries to send a password reset email to the provided email
    try {
      await sendPasswordResetEmail(auth, email);
      // If successful, it will return a success message
      return "Password reset email sent successfully!";
    } catch (error) {
      // If an error occurs, it will reject the action with the error message
      // you can see the logs on iiraadi's sentry account
      Sentry.captureException(error);
      console.error("rejectWithValue resetPassword value:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// This asynchronous Redux action will update the current 
// user's email to the provided email.
export const updateEmail = createAsyncThunk(
  "user/updateEmail",
  async (email, { rejectWithValue }) => {
     // Tries to update the current user's email to the provided email
    try {
      const user = auth.currentUser;
      await updateUserEmail(user, email);
      // If successful, it will return the new email
      return email;
    } catch (error) {
      // If an error occurs, it will reject the action with the error message
      // you can see the logs on iiraadi's sentry account
      Sentry.captureException(error);
      console.error("rejectWithValue updateEmail value:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// This asynchronous Redux action will update the current 
// user's password to the provided password.
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (password, { rejectWithValue }) => {
    // Tries to update the current user's password to the provided password
    try {
      const user = auth.currentUser;
      await updateUserPassword(user, password);
      // If successful, it will return a success message
      return "Password updated successfully!";
    } catch (error) {
      // If an error occurs, it will reject the action with the error message
      // you can see the logs on iiraadi's sentry account
      console.error("rejectWithValue updatePassword value:", error.message);
      Sentry.captureException(error);
      return rejectWithValue(error.message);
    }
  }
);

// This function waits for a user document to exist in Firestore.
const waitForUserDocument = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  let userDoc = await getDoc(userDocRef);
  // Continually checks if the user's document exists in Firestore
  while (!userDoc.exists()) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    userDoc = await getDoc(userDocRef);
  }
  // If it does, it returns the document
  // If it doesn't, it waits for a short period of time (0.1 sec) and checks again
  return userDoc;
  
};

/* This function handles the case where a user tries to sign in using Google or Facebook,
but the email associated with their Google or Facebook account is already associated with another
type of account. For instance, if the email is already associated with a password-based account, 
this function will prompt the user for their password and then link the new sign-in method 
(Google or Facebook) with the existing account.
currently we are only using the google signin to avoid the
auth/account-exists-with-different-credential error when triggered by facebook and only handle it 
when it is triggered by email/password sign in */
async function handleDifferentCredentialError(error, rejectWithValue) {
  const userEmail = auth?.currentUser?.email;
  const existingEmail = userEmail || error?.customData?.email;

  const providerId = error.customData._tokenResponse.providerId;
  const accessToken = error.customData._tokenResponse.oauthAccessToken;
  const pendingCred =
    providerId === "facebook.com"
      ? facebookProvider.constructor.credential(accessToken)
      : providerId === "google.com"
      ? googleProvider.constructor.credential(accessToken)
      : null;

  if (!existingEmail) {
    return rejectWithValue("An unexpected error occurred. Please try again.");
  }

  try {
    const providers = await fetchSignInMethodsForEmail(auth, existingEmail);
    if (providers.includes(emailProvider.providerId)) {
      const password = window.prompt(
        "Please provide the password for " + existingEmail
      );
      const userCredential = await signInWithEmailAndPassword(
        auth,
        existingEmail,
        password
      );
      const user = userCredential.user;
      console.log("user:", user);
      await linkWithCredential(user, pendingCred);
    } else if (
      providers.includes(facebookProvider.providerId) &&
      providerId === "google.com"
    ) {
      // Sign in with Facebook
      console.log("facebook");
      facebookProvider.setCustomParameters({ login_hint: existingEmail });
      const userCredential = await getRedirectResult(auth);
      const user = userCredential.user;
      await linkWithCredential(user, pendingCred);
    } else if (
      providers.includes(googleProvider.providerId) &&
      providerId === "facebook.com"
    ) {
      // Sign in with Google
      console.log("google");
      googleProvider.setCustomParameters({ login_hint: existingEmail });
      console.log("auth:", auth);
      const userCredential = await getRedirectResult(auth);
      console.log("auth:", auth);
      console.log("user credential:", userCredential);
      if (!userCredential) {
        throw new Error("User credential is null");
      }
      const user = userCredential?.user;
      await linkWithCredential(user, pendingCred);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log("Error in handleDifferentCredentialError:", error);
    return rejectWithValue("An unexpected error occurred. Please try again.");
  }
}

// This asynchronous thunk function signs a user in with their Google account.
export const signInWithGoogle = createAsyncThunk("user/signInWithGoogle", async (_, { rejectWithValue }) => {
  try {
    // Use Firebase's signInWithPopup method to sign in the user
    const result = await signInWithPopup(auth, googleProvider);
    
    // Destructure the user object to only get the fields we need
    const { uid, email, displayName, photoURL } = result.user;
    const userDoc = await waitForUserDocument(result.user);
    const userData = userDoc.data();
    const role = userData.role;
    
    // Create a sanitized user object that only contains serializable values
    const sanitizedUser = { uid, email, displayName, photoURL, role };
    
    // Return the sanitized user object to be stored in Redux state
    return sanitizedUser;
  } catch (error) {
    // Handle errors by sending them to Sentry and rejecting the promise
    Sentry.captureException(error);
    return rejectWithValue(error.message);
  }
});

// This asynchronous thunk function signs a user in with their Facebook account.
export const signInWithFacebook = createAsyncThunk("user/signInWithFacebook", async (_, { rejectWithValue }) => {
  console.log("Starting Facebook sign-in redirect operation...");
  try {
    await signInWithRedirect(auth, facebookProvider);
    console.log("Facebook sign-in redirect operation completed successfully.");
    // Add a delay before calling getRedirectResult
    await new Promise(resolve => setTimeout(resolve, 60000));
  } catch (error) {
    console.log("Error during Facebook sign-in redirect operation:", error);
    Sentry.captureException(error);
    console.log("rejectwithvalue signInWithFacebook value:",error.message);
    return rejectWithValue(error.message);
  }
});

// This asynchronous thunk function uploads the profile picture.
export const uploadAndCompressProfilePicture = createAsyncThunk(
  "user/uploadAndCompressProfilePicture",
  async (profilePictureFile, { rejectWithValue }) => {
    try {
      // Convert the file to a base64 string
      const reader = new FileReader();
      reader.readAsDataURL(profilePictureFile);
      const base64String = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result.split(',')[1]);
      });

      // Call the Cloud Function to upload the image
      const uploadImage = httpsCallable(functions, "uploadImage");
      const response = await uploadImage({ image: base64String });

      // Return the download URL
      return response.data.url;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// This asynchronous thunk function fetches and updates the current user's 
// information in the Redux store.
export const fetchAndUpdateCurrentUser = createAsyncThunk(
  "user/fetchAndUpdateCurrentUser",
  async (uid, { rejectWithValue }) => {
    try {
      // Log the user id for debugging purposes
      console.log("user id value in fetch:", uid);

      // Get a reference to the document in the 'users' collection with the provided uid
      const userDocRef = doc(db, "users", uid);
      
      // Fetch the document from Firestore
      const userDoc = await getDoc(userDocRef);
      console.log("did it reach here? yes it did");

      // Check if the document exists
      if (userDoc.exists()) {
        // If the document exists, get the data from the document
        const userData = userDoc?.data();
        // Return the user's display name, phone number, and profile picture URL
        return {
          displayName: userData.displayName,
          phoneNumber: userData.phoneNumber,
          photoURL: userData.photoURL,
          role: userData.role
        };
      } else {
        // If the document does not exist, log a message and return null values
        console.log("User document does not exist");
        return {
          displayName: null,
          phoneNumber: null,
          photoURL: null,
          role: null,
        };
      }
    } catch (error) {
      // If there's an error during this process, log the error message,
      // capture the error with Sentry for error tracking, and reject the promise with the error message
      Sentry.captureException(error);
      //console.log("rejectwithvalue fetchAndUpdate value:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Get a reference to the 'users' collection
      const usersCollectionRef = collection(db, 'users');

      // Fetch all documents from the 'users' collection
      const querySnapshot = await getDocs(usersCollectionRef);

      // Initialize an empty array to hold the user data
      const users = [];

      // Loop through each document and push the data to the users array
      querySnapshot.forEach((doc) => {
        users.push({ uid: doc.id, ...doc.data() });
      });

      // Return the array of users
      return users;
    } catch (error) {
      // If there's an error, reject the promise with the error message
      return rejectWithValue(error.message);
    }
  }
);

// This asynchronous thunk function updates a user's profile information in the Firebase database.
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    { uid, displayName, phoneNumber, profilePictureFile },
    { rejectWithValue }
  ) => {
    try {
      let profilePictureUrl;

      if (profilePictureFile) {
        // Compress the image before uploading it to Firebase Storage
        const options = {
          maxSizeMB: 0.4, // (400KB)
          maxWidthOrHeight: 4000,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(profilePictureFile, options);

        // Create a reference to the location in Firebase Storage where the profile picture will be stored.
        const storageRef = ref(storage, `profilePictures/${uid}`);

        // Upload the compressed profile picture file to Firebase Storage.
        await uploadBytes(storageRef, compressedFile);

        // Once the upload is complete, get the download URL for the profile picture.
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      // Get a reference to the document in the 'users' collection with the provided uid.
      const userDocRef = doc(db, "users", uid);

      // Update the user document in Firestore with the new profile information and the current time as the updated time.
      await updateDoc(userDocRef, {
        displayName,
        phoneNumber,
        photoURL: profilePictureUrl,
        updatedAt: new Date().toISOString(),
      });

      // Get the current user from Firebase Authentication.
      const user = auth.currentUser;

      // Reload the user's authentication profile to ensure that the latest user information is available in the auth profile.
      await user.reload();

      // Return the new user profile information.
      return {
        displayName,
        phoneNumber,
        photoURL: profilePictureUrl,
      };
    } catch (error) {
      // If there's an error during this process, reject the promise with the error message.
      return rejectWithValue(error.message);
    }
  }
);


// This adapter creates selectors for basic Redux CRUD operations.
const userAdapter = createEntityAdapter({
  selectId: (user) => user.uid,
});

// This is the initial state for the user slice of the Redux store.
const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null,
  user: {
    displayName: null,
    phoneNumber: null,
    photoURL: null,
    role: null
  },
});

// This creates the Redux slice for user operations.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    upsertUser: userAdapter.upsertOne,
    removeAllUsers: userAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmailPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpWithEmailPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.upsertOne(state, action.payload);
        state.error = null;
      })
      .addCase(signUpWithEmailPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signInWithEmailPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInWithEmailPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.upsertOne(state, action.payload);
        state.error = null;
      })
      .addCase(signInWithEmailPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signOutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = "succeeded";
        userAdapter.removeAll(state);
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.updateOne(state, {
          id: action.payload.id,
          changes: { email: action.payload.email },
        });
        state.error = null;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.upsertOne(state, action.payload);
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signInWithFacebook.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.upsertOne(state, action.payload);
        state.error = null;
      })
      .addCase(signInWithFacebook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAndUpdateCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAndUpdateCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.displayName = action.payload.displayName;
        state.user.phoneNumber = action.payload.phoneNumber;
        state.user.photoURL = action.payload.photoURL;
        state.user.role = action.payload.role;
        state.error = null;
      })
      .addCase(fetchAndUpdateCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // This will add all the fetched users to the state
        userAdapter.setAll(state, action.payload);
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.displayName = action.payload.displayName;
        state.user.phoneNumber = action.payload.phoneNumber;
        state.user.photoURL = action.payload.photoURL;
        state.error = null;
      })      
      .addCase(uploadAndCompressProfilePicture.fulfilled, (state, action) => {
        state.user.photoURL = action.payload;
      });
  },
});

// These are the Redux actions that can be dispatched for user operations.
export const { upsertUser, removeAllUsers } = userSlice.actions;

// This asynchronous thunk function listens for changes in the user's sign-in state.
// If the user is signed in, their information is fetched from Firestore and saved in the Redux store.
// If the user is not signed in, all user data is removed from the Redux store.
export const signInStateChangeListener = createAsyncThunk(
  "user/signInStateChangeListener",
  async (_, { dispatch, rejectWithValue }) => {
    // Register a listener for changes in the user's authentication state.
    // This listener will be called each time the user's sign-in status changes.
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If the user is signed in, wait for the user's document in Firestore to be available.
        const userDoc = await waitForUserDocument(user);

        // If the user's document exists, get the user data from it.
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Fetched user data from Firestore: ", userData);

          // Prepare the payload with the user's data.
          const payload = {
            uid: userData.uid,
            email: userData.email,
            displayName: userData.displayName,
            phoneNumber: userData.phoneNumber,
            photoURL: userData.photoURL,
            role: userData.role
          };

          // Dispatch the upsertUser action to update the user's data in the Redux store.
          dispatch(upsertUser(payload));
        }
      } else {
        // If the user is not signed in, dispatch the removeAllUsers action to 
        // clear the user data from the Redux store.
        dispatch(removeAllUsers());
      }
    });
  }
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => state.user);

export const selectCurrentUser = createSelector(selectAllUsers, (users) => (users.length > 0 ? users[0] : null));

export const selectUserByUid = createSelector(
  // First input selector: all users
  selectAllUsers,
  // Second input selector: the current state and props, but we only need the props (uid)
  (state, uid) => uid,
  // Result function: find and return the user with the specified uid
  (users, uid) => users.find(user => user.uid === uid)
);

export default userSlice.reducer;
