//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonGroup, Button, Glyphicon, OverlayTrigger, Tooltip, ButtonToolbar
} from 'react-bootstrap';

//------------------------------------------------------------------------------
// Sort Settings
//------------------------------------------------------------------------------
class ContentPanel extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    editHref: PropTypes.string
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    const { itemId, score } = this.props;

    //--------------------------------------------------------------------------
    // Set the tooltips up
    //--------------------------------------------------------------------------
    const tooltipVoteUp = (
      <Tooltip id={'tooltip-'+itemId+'-vote-up'}>Vote Up.</Tooltip>
    );
    const tooltipScore = (
      <Tooltip id={'tooltip-'+itemId+'-score'}>Score.</Tooltip>
    );
    const tooltipVoteDown = (
      <Tooltip id={'tooltip-'+itemId+'-vote-down'}>Vote Down.</Tooltip>
    );
    const tooltipEdit = (
      <Tooltip id={'tooltip-'+itemId+'-edit'}>Edit.</Tooltip>
    );
    const tooltipDelete = (
      <Tooltip id={'tooltip-'+itemId+'-delete'}>Delete.</Tooltip>
    );

    //--------------------------------------------------------------------------
    // Score buttone
    //--------------------------------------------------------------------------
    const scoreButtons = (
      <ButtonGroup bsSize="xsmall">

        <OverlayTrigger placement='top' overlay={tooltipVoteUp}>
          <Button onClick={() => { this.props.onUpVote(); }}>
            <Glyphicon glyph='thumbs-up'/>
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement='top' overlay={tooltipScore}>
          <Button disabled>
            {score}
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement='top' overlay={tooltipVoteDown}>
          <Button onClick={() => { this.props.onDownVote(); }}>
            <Glyphicon glyph='thumbs-down'/>
          </Button>
        </OverlayTrigger>

      </ButtonGroup>
    );

    //--------------------------------------------------------------------------
    // Control buttons - edit and delete
    //--------------------------------------------------------------------------
    const controlButtons = (
      <ButtonGroup bsSize="xsmall">

        <OverlayTrigger placement='top' overlay={tooltipEdit}>
          <Button
            onClick={() => {
              if(this.props.onEdit)
                this.props.onEdit();
            }}
            href={this.props.editHref}
            >
            <Glyphicon glyph='pencil'/>
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement='top' overlay={tooltipDelete}>
          <Button onClick={() => { this.props.onDelete(); }}>
            <Glyphicon glyph='remove'/>
          </Button>
        </OverlayTrigger>

      </ButtonGroup>
    );

    //--------------------------------------------------------------------------
    // Render the content
    //--------------------------------------------------------------------------
    return (
      <div className='content-panel'>
        <ButtonToolbar>
          {scoreButtons}
          {controlButtons}
        </ButtonToolbar>
      </div>
    );
  }
}

export default ContentPanel;
