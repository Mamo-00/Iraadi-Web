import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

// Asynchronous action to fetch categories
export const fetchSubcategories = createAsyncThunk('subcategories/fetchSubcategories', async (_, { rejectWithValue }) => {
  try {
    const subcategoriesSnapshot = await getDocs(collection(db, "subcategories"));
    const subcategories = subcategoriesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.data().id,
    }));
    return subcategories;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return rejectWithValue(error.message);
  }
});

const subcategoriesAdapter = createEntityAdapter({
  selectId: (subcategory) => subcategory.id,
});

const initialState = subcategoriesAdapter.getInitialState({ status: 'idle', error: null });

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        subcategoriesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



// Selectors
export const {
  selectAll: selectAllSubcategories,
  selectById: selectSubcategoryById,
  selectIds: selectSubcategoryIds,
} = subcategoriesAdapter.getSelectors((state) => state.subcategories);



export default subcategoriesSlice.reducer;