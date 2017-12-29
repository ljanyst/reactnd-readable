//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

export const SET_POSTS = 'SET_POSTS';

export function setPosts(postList) {
  return {
    type: SET_POSTS,
    postList
  };
}
