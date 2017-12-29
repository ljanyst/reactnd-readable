//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import DirectionsIcon from 'react-icons/lib/md/directions';

//------------------------------------------------------------------------------
// Wrong route
//------------------------------------------------------------------------------
class WrongRoute extends Component {

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    return (
      <div align='center'>
        <DirectionsIcon size={300} color='DimGrey'/>
        <h3>It is not what you're looking for.</h3>
      </div>
    );
  }
}

export default WrongRoute;
