import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

// Asynchronous action to fetch categories
export const fetchSubSubcategories = createAsyncThunk('subSubcategories/fetchSubSubCategories', async (_, { rejectWithValue }) => {
  try {
    const subSubcategoriesSnapshot = await getDocs(collection(db, "sub-subcategories"));
    const subSubcategories = subSubcategoriesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.data().id,
    }));
    return subSubcategories;
  } catch (error) {
    console.error("Error fetching subsubcategories:", error);
    return rejectWithValue(error.message);
  }
});

const subSubcategoriesAdapter = createEntityAdapter({
  selectId: (subSubcategory) => subSubcategory.id,
});

const initialState = subSubcategoriesAdapter.getInitialState({ status: 'idle', error: null });

const subSubcategoriesSlice = createSlice({
  name: 'subSubcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubSubcategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubSubcategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        subSubcategoriesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchSubSubcategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



// Get the basic selectors
export const {
  selectAll: selectAllSubSubcategories,
  selectById: selectSubSubcategoryById,
  selectIds: selectSubSubcategoryIds,
} = subSubcategoriesAdapter.getSelectors((state) => state.subSubcategories);

export default subSubcategoriesSlice.reducer;
