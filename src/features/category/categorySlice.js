import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const fetchCategories = httpsCallable(functions, 'fetchCategories');
    const response = await fetchCategories();
    return response.data.categories;
  } catch (error) {
    console.error("rejectWithValue fetchCategories value:", error.message);
    return rejectWithValue(error.message);
  }
});

// Do the same for subcategories and sub-subcategories

const categoriesAdapter = createEntityAdapter();

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState({ status: 'idle', error: null }),
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
      });
      // Do the same for subcategories and sub-subcategories
  },
});

export default categoriesSlice.reducer;


export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state) => state.categories);

export const selectSubcategories = (state) => state.categories.subcategories;
export const selectSubSubcategories = (state) => state.categories.subSubcategories;