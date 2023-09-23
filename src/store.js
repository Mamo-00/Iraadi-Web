import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/category/categorySlice';
import subcategoriesReducer from './features/category/subcategorySlice';
import subSubcategoriesReducer from './features/category/subsubcategorySlice';
import adsReducer from './features/ads/adsSlice';
import userReducer from './features/user/userSlice';


const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    subSubcategories: subSubcategoriesReducer,
    ads: adsReducer,
    user: userReducer,
  },
});

export default store;
