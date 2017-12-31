//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React from 'react';
import SyncIcon from 'react-icons/lib/md/sync';

export default function Loading(props) {
  return (
    <div className='col-md-8 col-md-offset-2'>
      <div align='center'>
        <SyncIcon size={300} color='DimGrey'/>
        <h3>Loading. Please wait.</h3>
      </div>
    </div>
  );
}
