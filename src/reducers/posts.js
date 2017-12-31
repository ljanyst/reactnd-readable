//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import {
  POST_SET_LIST, POST_UP_VOTE, POST_DOWN_VOTE, POST_DELETE
} from '../actions/posts';

export function postReducer(state = {}, action) {
  switch(action.type) {

  case POST_SET_LIST:
    return action.postList.reduce((state, post) => {
      state[post.id] = post;
      return state;
    }, {});

  case POST_UP_VOTE:
    var newStateVUp = {...state};
    newStateVUp[action.id].voteScore++;
    return newStateVUp;

  case POST_DOWN_VOTE:
    var newStateVDown = {...state};
    newStateVDown[action.id].voteScore--;
    return newStateVDown;

  case POST_DELETE:
    var newStateDelete = {...state};
    delete newStateDelete[action.id];
    return newStateDelete;

  default:
    return state;
  }
}
