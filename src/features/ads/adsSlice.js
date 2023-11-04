import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import { httpsCallable } from "firebase/functions";
import { functions, db } from "../../firebase/firebase-config";
import * as Sentry from "@sentry/react";

// Async thunks
export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async (args, { rejectWithValue }) => {
    try {
      const { lastVisible } = args;
      const getAds = httpsCallable(functions, "getAds");
      const response = await getAds({ lastVisible });
      if (!response.data.status || response.data.status !== "success") {
        throw new Error("Network response was not ok");
      }
      return { ads: response.data.ads, lastVisible: response.data.lastVisible };
    } catch (error) {
      console.error("rejectWithValue fetchAds value:", error.message);
      Sentry.captureException(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredAds = createAsyncThunk(
  "ads/fetchFilteredAds",
  async (args, { getState, rejectWithValue }) => {
    try {
      const { filters, lastVisible } = args;
      console.log("Last Visible in Redux Thunk:", lastVisible);
      console.log('filters in redux thunk', filters);
      const getFilteredAds = httpsCallable(functions, "getFilteredAds");
      const response = await getFilteredAds({ ...filters, lastVisible });

      console.log("Server Response:", response.data);

      if (!response.data.status || response.data.status !== "success") {
        throw new Error("Network response was not ok");
      }

      return { ads: response.data.ads, lastVisible: response.data.lastVisible };
    } catch (error) {
      console.error("rejectWithValue fetchFilteredAds value:", error.message);
      Sentry.captureException(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postAd = createAsyncThunk(
  "ads/postAd",
  async (newAd, { getState, rejectWithValue }) => {
    try {
      const { uid } = getState().user;
      const createAd = httpsCallable(functions, "createAd");

      // Upload images to Firebase Storage and get download URLs
      const imageUrls = []; // This will hold the URLs
      for (const [index, image] of newAd.Images.entries()) {
        const storageRef = ref(
          storage,
          `adPictures/${uid}/${newAd.id}/${index}`
        );
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }

      // Add image URLs to the ad data
      newAd.Images = imageUrls; // Now it's an array

      await createAd({ ad: newAd, uid: uid });
      return newAd;
    } catch (error) {
      console.error("rejectWithValue postAd value:", error.message);
      Sentry.captureException(error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateAd = createAsyncThunk(
  "ads/updateAd",
  async (updatedAd, { rejectWithValue }) => {
    try {
      const adDoc = doc(db, "ads", updatedAd.id);
      await updateDoc(adDoc, updatedAd);
      return updatedAd;
    } catch (error) {
      console.error("rejectWithValue updatedAd value:", error.message);
      Sentry.captureException(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAd = createAsyncThunk(
  "ads/deleteAd",
  async (adId, { rejectWithValue }) => {
    try {
      const adDoc = doc(db, "ads", adId);
      await deleteDoc(adDoc);
      return adId;
    } catch (error) {
      console.error("rejectWithValue deleteAd value:", error.message);
      Sentry.captureException(error);
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const adsAdapter = createEntityAdapter();

const initialState = adsAdapter.getInitialState({
  status: "idle",
  error: null,
  filteredAds: { ads: [] }, 
  lastVisible: null,
  ads:[],
  allAdsFetched: false,
  filterChange: false,
});

// Slice
const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setFilterChange: (state, action) => {
      state.filterChange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Concatenate the new ads to the existing ads array
        state.ads = state.ads.concat(action.payload.ads);
        state.lastVisible = action.payload.lastVisible;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFilteredAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        state.lastVisible = action.payload.lastVisible;

        // Add this block to handle the allAdsFetched flag
        // TODO dont forget to change the page size later when increased
        if (action.payload.ads.length < 4) { // Assuming 4 is the page size
          state.allAdsFetched = true;
        } else {
          state.allAdsFetched = false; // Reset the flag if more ads are available
        }

        if (state.filterChange === true) { // Assuming 4 is the page size
          state.filteredAds.ads = action.payload.ads;
          state.filterChange = false;
        } else {
          state.filteredAds.ads = state.filteredAds.ads.concat(action.payload.ads);
        }

      })
      .addCase(fetchFilteredAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postAd.fulfilled, (state, action) => {
        adsAdapter.addOne(state, action.payload);
      })
      .addCase(updateAd.fulfilled, (state, action) => {
        adsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        adsAdapter.removeOne(state, action.payload);
      });
  },
});
export const { setActiveFilters, setFilterChange } = adsSlice.actions;

// Selectors
export const {
  selectAll: selectAllAds,
  selectById: selectAdById,
  selectIds: selectAdIds,
} = adsAdapter.getSelectors((state) => state.ads);

// Custom selector to get an ad by its id
export const selectAdByIdCustom = createSelector(
  // First input selector: all ads
  selectAllAds,
  // Second input selector: get the current ad id from the component's props
  (state, adId) => adId,
  // Result function: find and return the ad that matches the id
  (allAds, adId) => allAds.find((ad) => ad.id === adId)
);

export default adsSlice.reducer;
