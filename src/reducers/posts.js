//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import {
  POSTS_SET, POST_UP_VOTE, POST_DOWN_VOTE, POST_DELETE
} from '../actions/posts';
import { cfm } from '../utils/helpers';

export function postReducer(state = [], action) {
  switch(action.type) {

  case POSTS_SET:
    return action.postList;

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
