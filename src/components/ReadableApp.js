//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReadableNav from './ReadableNav';
import WrongRoute from './WrongRoute';

//------------------------------------------------------------------------------
// The Application
//------------------------------------------------------------------------------
class ReadableApp extends Component {
  render() {
    return (
      <div>
        <ReadableNav/>
        <div className='col-md-8 col-md-offset-2'>
          <Switch>
            <Route component={WrongRoute} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default ReadableApp;
