import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { getDocs, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase-config"; 
import { httpsCallable } from "firebase/functions";
import { functions, db, } from "../../firebase/firebase-config";
import * as Sentry from "@sentry/react";

// Async thunks
export const fetchAds = createAsyncThunk('ads/fetchAds', async (_, { rejectWithValue } ) => {
  try {
    const adCollection = collection(db, 'ads');
    const adSnapshot = await getDocs(adCollection);
    const adList = adSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.log('the ads!', adList);
    return adList;
  } catch (error) {
    console.error("rejectWithValue fetchAds value:", error.message);
    Sentry.captureException(error);
    return rejectWithValue(error.message);
  }
  
});

export const postAd = createAsyncThunk('ads/postAd', async (newAd, { getState, rejectWithValue }) => {
  try {
    const { uid } = getState().user;
    const createAd = httpsCallable(functions, 'createAd');
    
    // Upload images to Firebase Storage and get download URLs
    const imageUrls = []; // This will hold the URLs
    for (const [index, image] of newAd.Images.entries()) {
      const storageRef = ref(storage, `adPictures/${uid}/${newAd.id}/${index}`);
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
});

export const updateAd = createAsyncThunk('ads/updateAd', async (updatedAd, { rejectWithValue }) => {
  try {
    const adDoc = doc(db, 'ads', updatedAd.id);
    await updateDoc(adDoc, updatedAd);
    return updatedAd;

  } catch (error) {
    console.error("rejectWithValue updatedAd value:", error.message);
    Sentry.captureException(error);
    return rejectWithValue(error.message);
  }
});

export const deleteAd = createAsyncThunk('ads/deleteAd', async (adId, { rejectWithValue }) => {
  try {
    const adDoc = doc(db, 'ads', adId);
    await deleteDoc(adDoc);
    return adId;
    
  } catch (error) {
    console.error("rejectWithValue deleteAd value:", error.message);
    Sentry.captureException(error);
    return rejectWithValue(error.message);
  }
});

// Slice
const adsAdapter = createEntityAdapter();

// Slice
const adsSlice = createSlice({
  name: 'ads',
  initialState: adsAdapter.getInitialState({ status: 'idle', error: null }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        adsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = 'failed';
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
  (allAds, adId) => allAds.find(ad => ad.id === adId)
);

export default adsSlice.reducer;