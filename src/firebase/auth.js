import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider, facebookProvider, emailProvider, functions, db } from "./firebase-config";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { httpsCallable } from "firebase/functions";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signOut,
  sendPasswordResetEmail,
  updateEmail as updateUserEmail,
  updatePassword as updateUserPassword,
} from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const DEFAULT_PROFILE_PICTURE_URL = "defaultProfilePicture";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onError, setOnError] = useState('');
  
  const createUserWithEmailPassword = httpsCallable(functions, "createUserWithEmailPassword");
  // Object containing functions for signing in with email and password
  const signInWithEmailPassword = {
    signup: async (email, password, name, phone) => {
      try {
        const providers = await fetchSignInMethodsForEmail(auth, email);
        if (providers.length > 0) {
          // The email is already linked with another provider
          const providerNames = providers.map(providerId => {
            switch (providerId) {
              case "google.com":
                return "Google";
              case "facebook.com":
                return "Facebook";
              default:
                return providerId;
            }
          });
    
          const message = `The email address is already in use by another account with ${
            providerNames.length > 1 ? "these providers: " : "this provider: "
          }${providerNames.join(", ")}. Please use ${
            providerNames.length > 1 ? "one of them" : "it"
          } to sign in.`;
    
          setOnError(message);
          // You can display the message to the user using a UI element, like a notification or modal
        } else {
          // Proceed with the email/password account creation process
          const result = await createUserWithEmailPassword({ email, password, name, phone });
          const uid = result.data.uid;
    
          // Get the user from Auth using the returned uid
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Fetch user data from Firestore
          const userDocRef = doc(db, "users", uid);
          const userDoc = await getDoc(userDocRef);
    
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Update the currentUser object with the Firestore data
            setCurrentUser((prevUser) => ({
              ...prevUser,
              displayName: userData.displayName,
              phoneNumber: userData.phoneNumber,
              photoURL: userData.photoURL,
            }));
    
            // Set the profilePictureUrl
            setProfilePictureUrl(userData.photoURL);
          }
        }
      } catch (error) {
        console.log(error.code, error.message);
      }
    },
    login: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Update the currentUser object with the Firestore data
          setCurrentUser((prevUser) => ({
            ...prevUser,
            displayName: userData.displayName,
            phoneNumber: userData.phoneNumber,
            photoURL: userData.photoURL,
          }));
    
          // Set the profilePictureUrl
          setProfilePictureUrl(userData.photoURL);
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    },    
    logout: () => {
      return signOut(auth)
        .then(() => {
          setCurrentUser(null);
          console.log('logged out')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    resetPassword: (email) => {
      return sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Password reset email sent successfully!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    updateEmail: (email) => {
      try {
        return updateUserEmail(currentUser, email);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    },
    updatePassword: (password) => {
      try {
        return updateUserPassword(currentUser, password);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const waitForUserDocument = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    let userDoc = await getDoc(userDocRef);
  
    // Wait until the user document exists
    while (!userDoc.exists()) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms
      userDoc = await getDoc(userDocRef);
    }
  
    return userDoc;
  };

  
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result?.user;
      console.log("User signed in:", user);
  
      // Fetch user data from Firestore
      const userDoc = await waitForUserDocument(user);
  
      if (userDoc.exists()) {
        const userData = userDoc?.data();
        // Update the currentUser object with the Firestore data
        setCurrentUser((prevUser) => ({
          ...prevUser,
          displayName: userData?.displayName || user?.displayName,
          phoneNumber: userData?.phoneNumber || user?.phoneNumber,
          photoURL: userData?.photoURL || user?.photoURL,
        }));
  
        // Set the profilePictureUrl
        setProfilePictureUrl(userData?.photoURL || user?.photoURL);
      }
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        // Original error handling code
        const userEmail = auth.currentUser?.email;
        const existingEmail = userEmail || error.customData?.email;
  
        // Create a credential from the OAuth access token
        const providerId = error.customData._tokenResponse.providerId;
        const accessToken = error.customData._tokenResponse.oauthAccessToken;
        const pendingCred =
          providerId === "facebook.com"
            ? facebookProvider.constructor.credential(accessToken)
            : providerId === "google.com"
            ? googleProvider.constructor.credential(accessToken)
            : null;
  
        if (!existingEmail) {
          setOnError("An unexpected error occurred. Please try again.");
          return;
        }
  
        try {
          const providers = await fetchSignInMethodsForEmail(auth, existingEmail);
          if (providers.includes(emailProvider.providerId)) {
            const password = window.prompt(
              "Please provide the password for " + existingEmail
            );
            const user = await signInWithEmailPassword.login(
              existingEmail,
              password
            );
            await linkWithCredential(user, pendingCred);
          } else if (providers.includes(facebookProvider.providerId)) {
            facebookProvider.setCustomParameters({ login_hint: existingEmail });
            const result = await signInWithPopup(auth, facebookProvider);
            await linkWithCredential(result.user, pendingCred);
          } else if (providers.includes(googleProvider.providerId)) {
            setOnError(
              "You have already signed up with this email using Google. Please use Google to sign in."
            );
          } else {
            throw new Error("Unsupported provider.");
          }
        } catch (error) {
          setOnError("An unexpected error occurred. Please try again.");
        }
        console.log("profile image: ", profilePictureUrl);
        console.log("user: ", currentUser);
      } else {
        setOnError("Error signing in with Google. Please try again.");
      }
    }
  };
  
  
  async function signInWithFacebook() {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result?.user;
      console.log("User signed in:", user);
  
      // Fetch user data from Firestore
      const userDoc = await waitForUserDocument(user);
  
      if (userDoc.exists()) {
        const userData = userDoc?.data();
        // Update the currentUser object with the Firestore data
        setCurrentUser((prevUser) => ({
          ...prevUser,
          displayName: userData?.displayName || user?.displayName,
          phoneNumber: userData?.phoneNumber || user?.phoneNumber,
          photoURL: userData?.photoURL || user?.photoURL,
        }));
  
        // Set the profilePictureUrl
        setProfilePictureUrl(userData?.photoURL || user?.photoURL);
      }
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const userEmail = auth.currentUser?.email;
        const existingEmail = userEmail || error.customData?.email;
  
        const providerId = error.customData._tokenResponse.providerId;
        const accessToken = error.customData._tokenResponse.oauthAccessToken;
        const pendingCred =
          providerId === "facebook.com"
            ? facebookProvider.constructor.credential(accessToken)
            : providerId === "google.com"
            ? googleProvider.constructor.credential(accessToken)
            : null;
  
        if (!existingEmail) {
          setOnError("An unexpected error occurred. Please try again.");
          return;
        }
  
        try {
          const providers = await fetchSignInMethodsForEmail(auth, existingEmail);
  
          if (providers.includes(emailProvider.providerId)) {
            const password = window.prompt(
              "Please provide the password for " + existingEmail
            );
            const user = await signInWithEmailPassword.login(
              existingEmail,
              password
            );
            await linkWithCredential(user, pendingCred);
          } else if (providers.includes(googleProvider.providerId)) {
            googleProvider.setCustomParameters({ login_hint: existingEmail });
            const result = await signInWithPopup(auth, googleProvider);
            await linkWithCredential(result.user, pendingCred);
          } else if (providers.includes(facebookProvider.providerId)) {
            setOnError(
              "You have already signed up with this email using Facebook. Please use Facebook to sign in."
            );
          } else {
            throw new Error("Unsupported provider.");
          }
        } catch (error) {
          setOnError("An unexpected error occurred. Please try again.");
        }
      } else {
        setOnError("Error signing in with Facebook. Please try again.");
      }
    }
  };
  

  const fetchUserProfilePicture = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
  
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      setProfilePictureUrl(userData.photoURL);
    } else {
      console.log("User document not found");
    }
  };

  const fetchAndUpdateCurrentUser = async () => {
    if (!currentUser || !currentUser.uid) return console.log("no current user");
  
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched photoURL:", userData.photoURL); // Add this line
  
        setCurrentUser((prevUser) => ({
          ...prevUser,
          displayName: userData.displayName,
          phoneNumber: userData.phoneNumber,
          photoURL: userData.photoURL,
        }));
  
        // Set the profilePictureUrl
        setProfilePictureUrl(userData.photoURL);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  const storage = getStorage();

  const updateProfile = async (uid, displayName, phoneNumber, profilePictureFile, callback) => {
    if (!uid) {
      console.error("Error updating user profile: Invalid user ID.");
      return;
    }
  
    try {
      // Upload the image file to Firebase Storage
      const storageRef = ref(storage, `profilePictures/${uid}`);
      await uploadBytes(storageRef, profilePictureFile);
      const profilePictureUrl = await getDownloadURL(storageRef);
  
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        displayName,
        phoneNumber,
        photoURL: profilePictureUrl,
        updatedAt: new Date().toISOString(),
      });
      console.log("User profile updated successfully.");
      const user = auth.currentUser;
      await user.reload();
      setCurrentUser(user);
  
      // Call the callback function with the updated user data
      callback({
        displayName,
        phoneNumber,
        photoURL: profilePictureUrl,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        // Fetch user data from Firestore and update the currentUser object
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser((prevUser) => ({
            ...prevUser,
            displayName: userData.displayName,
            phoneNumber: userData.phoneNumber,
            photoURL: userData.photoURL,
          }));
  
          // Set the profilePictureUrl
          setProfilePictureUrl(userData.photoURL);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  
  
  const value = {
    currentUser,
    profilePictureUrl,
    onError,
    updateProfile,
    fetchAndUpdateCurrentUser,
    ...signInWithEmailPassword,
    signInWithFacebook,
    signInWithGoogle,
  };
// TODO: add app check recaptcha
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
