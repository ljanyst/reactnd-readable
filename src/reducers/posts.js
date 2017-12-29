//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import { SET_POSTS } from '../actions/posts';

export function postReducer(state = [], action) {
  switch(action.type) {

  case SET_POSTS:
    return action.postList;

  default:
    return state;
  }
}
