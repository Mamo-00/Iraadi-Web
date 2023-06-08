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
      .filter(
        (product) =>
          (!categoryId || product.categoryId === categoryId) &&
          (!subcategoryId || product.subcategoryId === subcategoryId) &&
          (!subsubcategoryId || product.subsubcategoryId === subsubcategoryId)
      );

    return filteredProducts;
  }, [categoryId, subcategoryId, subsubcategoryId]);
};
