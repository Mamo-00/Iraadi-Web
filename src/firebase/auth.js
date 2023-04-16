import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider, facebookProvider, emailProvider, functions, db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
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
    
          // Fetch user profile from Firestore and update the state
          fetchUserProfile(uid);
    
          setCurrentUser(user);
        }
      } catch (error) {
        console.log(error.code, error.message);
      }
    },
    login: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setCurrentUser(user);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    },
    logout: () => {
      return auth.signOut()
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
      return auth.sendPasswordResetEmail(email)
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
        return currentUser.updateEmail(email);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    },
    updatePassword: (password) => {
      try {
        return currentUser.updatePassword(password);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profilePictureUrl = result.user?.photoURL;
      setProfilePictureUrl(profilePictureUrl);
      // Extract user information
      const userName = result.user?.displayName;
      console.log("username:", userName);
      const userPhone = ""; // Set this value based on your requirements

      // Set custom claims
      const setCustomClaims = httpsCallable(functions, "setCustomClaims");
      await setCustomClaims({
        uid: result.user?.uid,
        name: userName,
        phone: userPhone,
      });

      setCurrentUser(result.user);
    } catch (error) {
      console.log("Error is? ", error)
      if (error.code === "auth/account-exists-with-different-credential") {
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
        console.log("priofile image: ", profilePictureUrl);
        console.log("user: ", currentUser)
      } else {
        setOnError("Error signing in with Google. Please try again.");
      }
    }
  };

  async function signInWithFacebook() {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const profilePictureUrl = result.user?.photoURL;
      setProfilePictureUrl(profilePictureUrl);
      const userName = result.user?.displayName;
      
      const userPhone = ""; 

      // Set custom claims
      const setCustomClaims = httpsCallable(functions, "setCustomClaims");
      await setCustomClaims({
        uid: result.user?.uid,
        name: userName,
        phone: userPhone,
      });
      setCurrentUser(result.user);
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
  }

 
  const fetchUserProfile = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
  
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      setProfilePictureUrl(userData.photoURL);
    } else {
      console.log("User document not found");
    }
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        await fetchUserProfile(user.uid);
      }
    });
  
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    profilePictureUrl,
    onError,
    fetchUserProfile,
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
