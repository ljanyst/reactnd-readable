//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

export const POSTS_SET = 'POSTS_SET';
export const POST_UP_VOTE = 'POST_UP_VOTE';
export const POST_DOWN_VOTE = 'POST_DOWN_VOTE';
export const POST_DELETE = 'POST_DELETE';

export function setPosts(postList) {
  return {
    type: POSTS_SET,
    postList
  };
}

export function postUpVote(id) {
  return {
    type: POST_UP_VOTE,
    id
  };
}

export function postDownVote(id) {
  return {
    type: POST_DOWN_VOTE,
    id
  };
}

export function postDelete(id) {
  return {
    type: POST_DELETE,
    id
  };
}
