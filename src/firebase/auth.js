import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider, facebookProvider, app } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Object containing functions for signing in with email and password
  const signInWithEmailPassword = {
    signup: (email, password, name, phone) => {
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          const user = result.user;
          // Set custom claims
          const setCustomClaims = app.functions().httpsCallable("setCustomClaims");
          await setCustomClaims({ uid: user.uid, name, phone });
          setCurrentUser(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    login: (email, password) => {
      return auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          const user = result.user;
          setCurrentUser(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    logout: () => {
      return auth.signOut()
        .then(() => {
          setCurrentUser(null);
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

  // Function for signing in with Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setCurrentUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      setCurrentUser(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    ...signInWithEmailPassword,
    signInWithFacebook,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
