//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

export const SET_SORT_KEY = 'SET_SORT_KEY';

export function setSortKey(key, objectType) {
  return {
    type: SET_SORT_KEY,
    key,
    objectType
  };
}
