import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";


// Asynchronous action to fetch categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const categories = categoriesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.data().id,
    }));
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return rejectWithValue(error.message);
  }
});

const categoriesAdapter = createEntityAdapter(
);

const initialState = categoriesAdapter.getInitialState({ status: 'idle', error: null });

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        categoriesAdapter.setAll(state, action.payload);
      })
      
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('the error', action.error.message);
      });
  },
});

// Get the basic selectors
export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state) => state.categories);



// You can create additional custom selectors if needed
// For example, if you want to select the current category, you could do something like this:
export const selectCurrentCategory = createSelector(selectAllCategories, (categories) => (categories.length > 0 ? categories[0] : null));

export default categoriesSlice.reducer;

