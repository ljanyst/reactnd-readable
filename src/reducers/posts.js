//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import {
  POST_SET_LIST, POST_UP_VOTE, POST_DOWN_VOTE, POST_DELETE
} from '../actions/posts';
import { cfm } from '../utils/helpers';

export function postReducer(state = {}, action) {
  switch(action.type) {

  case POST_SET_LIST:
    return action.postList.reduce((state, post) => {
      state[post.id] = post;
      return state;
    }, {});

  case POST_UP_VOTE:
    return cfm(state, action.id, (post) => { post.voteScore++; });

  case POST_DOWN_VOTE:
    return cfm(state, action.id, (post) => { post.voteScore--; });

  case POST_DELETE:
    return state.filter(post => post.id !== action.id);

  default:
    return state;
  }
}
