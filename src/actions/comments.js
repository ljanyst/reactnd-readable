//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 31.12.2017
//------------------------------------------------------------------------------

export const COMMENT_SET_LIST = 'COMMENT_SET_LIST';
export const COMMENT_UP_VOTE = 'COMMENT_UP_VOTE';
export const COMMENT_DOWN_VOTE = 'COMMENT_DOWN_VOTE';
export const COMMENT_DELETE = 'COMMENT_DELETE';
export const COMMENT_EDIT = 'COMMENT_EDIT';

export function commentSetList(commentList) {
  return {
    type: COMMENT_SET_LIST,
    commentList
  };
}

export function commentUpVote(id) {
  return {
    type: COMMENT_UP_VOTE,
    id
  };
}

export function commentDownVote(id) {
  return {
    type: COMMENT_DOWN_VOTE,
    id
  };
}

export function commentDelete(id) {
  return {
    type: COMMENT_DELETE,
    id
  };
}

export function commentEdit(id, timestamp, body) {
  return {
    type: COMMENT_EDIT,
    id,
    timestamp,
    body
  };
}
