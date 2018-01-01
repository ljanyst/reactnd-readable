//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReadableNav from './ReadableNav';
import WrongRoute from './WrongRoute';
import PostList from './PostList';
import PostView from './PostView';
import PostAdd from './PostAdd';

//------------------------------------------------------------------------------
// The Application
//------------------------------------------------------------------------------
class ReadableApp extends Component {
  render() {
    return (
      <div>
        <ReadableNav/>

        <Switch>
          <Route exact path='/' component={PostList} />
          <Route exact path='/add-post' component={PostAdd} />
          <Route path='/:category/:postId' component={PostView} />
          <Route path='/:category' component={PostList} />
          <Route component={WrongRoute} />
        </Switch>
      </div>
    );
  }
}

export default ReadableApp;
