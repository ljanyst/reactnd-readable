//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export function addCategory({ name, path }) {
  return {
    type: ADD_CATEGORY,
    name,
    path
  };
}

export function setCategories(categoryList) {
  return {
    type: SET_CATEGORIES,
    categoryList
  };
}
