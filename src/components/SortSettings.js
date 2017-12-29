//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ButtonGroup, Button, Glyphicon, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import { setSortKey } from '../actions/settings';

//------------------------------------------------------------------------------
// Sort Settings
//------------------------------------------------------------------------------
class SortSettings extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    type: PropTypes.string.isRequired
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    const { sortKey, type } = this.props;

    //----------------------------------------------------------------------------
    // Tooltips
    //----------------------------------------------------------------------------
    const tooltipDate = (
      <Tooltip id='tooltip-date'>{`Sort ${type} by date.`}</Tooltip>
    );
    const tooltipScore = (
      <Tooltip id='tooltip-score'>{`Sort ${type} by score.`}</Tooltip>
    );

    //--------------------------------------------------------------------------
    // Rendering
    //--------------------------------------------------------------------------
    return (
      <div className='list-sort'>
        <ButtonGroup bsSize="xsmall">
          <OverlayTrigger placement='top' overlay={tooltipDate}>
            <Button
              active={sortKey === 'timestamp' ? true : false}
              onClick={() => {
                this.props.setSortKey('timestamp', type);
              }}>
              <Glyphicon glyph='sort'/> by date
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement='top' overlay={tooltipScore}>
            <Button
              active={sortKey === 'voteScore' ? true : false}
              onClick={() => {
                this.props.setSortKey('voteScore', type);
              }}>
              <Glyphicon glyph='sort'/> by score
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      </div>
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  return {
    sortKey: state.settings.sortKey[ownProps.type]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSortKey: (key, objectType) => dispatch(setSortKey(key, objectType))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSettings);
