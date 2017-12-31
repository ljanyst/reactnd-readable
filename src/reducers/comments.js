//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 31.12.2017
//------------------------------------------------------------------------------

import { COMMENT_SET_LIST } from '../actions/comments';

export function commentReducer(state = {}, action) {
  switch(action.type) {

  case COMMENT_SET_LIST:
    return action.commentList.reduce((state, comment) => {
      state[comment.id] = comment;
      return state;
    }, {});

  default:
    return state;
  }
}
