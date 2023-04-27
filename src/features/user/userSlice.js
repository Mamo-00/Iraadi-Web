import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase"; // Update this import path to the correct path for your project

// Fetch and update the current user
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser || !currentUser.uid) return console.log("no current user");

  try {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        displayName: userData.displayName,
        phoneNumber: userData.phoneNumber,
        photoURL: userData.photoURL,
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;