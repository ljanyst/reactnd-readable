//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 31.12.2017
//------------------------------------------------------------------------------

export const COMMENT_SET_LIST = 'COMMENT_SET_LIST';

export function commentSetList(commentList) {
  return {
    type: COMMENT_SET_LIST,
    commentList
  };
}
