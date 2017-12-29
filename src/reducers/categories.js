//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import { ADD_CATEGORY, SET_CATEGORIES } from '../actions/categories';

export function categoryReducer(state = [], action) {
  switch(action.type) {

  case ADD_CATEGORY:
    const { name, path } = action;
    return state.concat([{name, path}]);

  case SET_CATEGORIES:
    return action.categoryList;

  default:
    return state;
  }
}
