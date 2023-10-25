import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { getDocs, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "./firebaseConfig";
import * as Sentry from "@sentry/react";

// Async thunks
export const fetchCarAds = createAsyncThunk('carAds/fetchCarAds', async (_, { rejectWithValue }) => {
  try {
    const adCollection = collection(db, 'carAds');
    const adSnapshot = await getDocs(adCollection);
    const adList = adSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return adList;
  } catch (error) {
    Sentry.captureException(error);
    return rejectWithValue(error.message);
  }
});

export const postCarAd = createAsyncThunk('carAds/postCarAd', async (newAd, { getState, rejectWithValue }) => {
  try {
    const { uid } = getState().user;
    const createAd = httpsCallable(functions, 'createCarAd');
    await createAd({ ad: newAd, uid: uid });
    return newAd;
  } catch (error) {
    Sentry.captureException(error);
    return rejectWithValue(error.message);
  }
});

export const updateCarAd = createAsyncThunk('carAds/updateCarAd', async (updatedAd, { rejectWithValue }) => {
  try {
    const adDoc = doc(db, 'carAds', updatedAd.id);
    await updateDoc(adDoc, updatedAd);
    return updatedAd;
  } catch (error) {
    Sentry.captureException(error);
    return rejectWithValue(error.message);
  }
});

export const deleteCarAd = createAsyncThunk('carAds/deleteCarAd', async (adId, { rejectWithValue }) => {
  try {
    const adDoc = doc(db, 'carAds', adId);
    await deleteDoc(adDoc);
    return adId;
  } catch (error) {
    Sentry.captureException(error);
    return rejectWithValue(error.message);
  }
});

// Slice
const carAdsAdapter = createEntityAdapter();

const carAdSlice = createSlice({
  name: 'carAds',
  initialState: carAdsAdapter.getInitialState({ status: 'idle', error: null }),
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarAds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarAds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        carAdsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCarAds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postCarAd.fulfilled, (state, action) => {
        carAdsAdapter.addOne(state, action.payload);
      })
      .addCase(updateCarAd.fulfilled, (state, action) => {
        carAdsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteCarAd.fulfilled, (state, action) => {
        carAdsAdapter.removeOne(state, action.payload);
      });
  },
});

// Selectors
export const {
  selectAll: selectAllCarAds,
  selectById: selectCarAdById,
  selectIds: selectCarAdIds,
} = carAdsAdapter.getSelectors((state) => state.carAds);

// Custom selector to get an ad by its id
export const selectAdByIdCustom = createSelector(
  // First input selector: all ads
  selectAllCarAds,
  // Second input selector: get the current ad id from the component's props
  (state, adId) => adId,
  // Result function: find and return the ad that matches the id
  (allAds, adId) => allAds.find(ad => ad.id === adId)
);

export default carAdSlice.reducer;