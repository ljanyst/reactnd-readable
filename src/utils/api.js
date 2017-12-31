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
// Fetch the response or throw an error if the response is not successful
//------------------------------------------------------------------------------
const responseHandler = (response) => {
  if(!response.ok)
    throw Error(response.error);
  return response.json();
};

//------------------------------------------------------------------------------
// Get categories
//------------------------------------------------------------------------------
export const categoryGetList = () =>
  fetch(`${api}/categories`, { headers })
  .then(responseHandler)
  .then(data => data.categories);

//------------------------------------------------------------------------------
// Get posts
//------------------------------------------------------------------------------
export const postGetList = (category) => {
  var url = `${api}/posts`;
  if(category)
    url = `${api}/${category}/posts`;

  return fetch(url, { headers })
    .then(responseHandler);
};

//------------------------------------------------------------------------------
// Vote on a post
//------------------------------------------------------------------------------
export const postVote = (id, up=true) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: up ? 'upVote' : 'downVote' })
  })
  .then(responseHandler);

//------------------------------------------------------------------------------
// Vote on a post
//------------------------------------------------------------------------------
export const postDelete = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  .then(responseHandler);
