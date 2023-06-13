import { useMemo } from 'react';
import { products, categories, subcategories, subsubcategories } from "../products";

const categoryLookup = categories.reduce((acc, category) => {
  acc[category.name] = category.id;
  return acc;
}, {});

const subcategoryLookup = subcategories.reduce((acc, subcategory) => {
  acc[subcategory.name] = subcategory.id;
  return acc;
}, {});

const subsubcategoryLookup = subsubcategories.reduce((acc, subsubcategory) => {
  acc[subsubcategory.name] = subsubcategory.id;
  return acc;
}, {});


export const useProducts = (category, subcategory, subsubcategory) => {
  const categoryId = categoryLookup[category];
  const subcategoryId = subcategoryLookup[subcategory];
  const subsubcategoryId = subsubcategoryLookup[subsubcategory];

  return useMemo(() => {
    const filteredProducts = products
      .filter((product) => {
        // Always apply the category filter
        if (product.categoryId !== categoryId) {
          return false;
        }

        // Only apply the subcategory filter if a subcategory is defined
        if (subcategoryId && product.subcategoryId !== subcategoryId) {
          return false;
        }

        // Only apply the subsubcategory filter if a subsubcategory is defined
        if (subsubcategoryId && product.subsubcategoryId !== subsubcategoryId) {
          return false;
        }

        // If none of the above conditions were met, this product matches all filters
        return true;
      });

    return filteredProducts;
  }, [categoryId, subcategoryId, subsubcategoryId]);
};

