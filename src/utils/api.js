//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Set up the API
//------------------------------------------------------------------------------
const api = "http://localhost:3001";
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

//------------------------------------------------------------------------------
// Get categories
//------------------------------------------------------------------------------
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories);

//------------------------------------------------------------------------------
// Get posts
//------------------------------------------------------------------------------
export const getPosts = (category) => {
  var url = `${api}/posts`;
  if(category)
    url = `${api}/${category}/posts`;

  return fetch(url, { headers })
    .then(res => res.json());
};
