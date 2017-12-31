//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React from 'react';
import DirectionsIcon from 'react-icons/lib/md/directions';

export default function WrongRoute(props) {
  return (
    <div className='col-md-8 col-md-offset-2'>
      <div align='center'>
        <DirectionsIcon size={300} color='DimGrey'/>
        <h3>It is not what you're looking for.</h3>
        </div>
    </div>
  );
}
