//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import findBy from 'array-find-by';

//------------------------------------------------------------------------------
// Check if category exists
//------------------------------------------------------------------------------
export function categoryExists(categoryPath, categories) {
  const match = findBy.call(categories, 'path', categoryPath);
  return match[1] !== -1 ? true : false;
}
