//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 31.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl, Button } from 'react-bootstrap';
//import { Link } from 'react-router-dom';

import ContentPanel from './ContentPanel';

//------------------------------------------------------------------------------
// Comment List Item
//------------------------------------------------------------------------------
class CommentListItem extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    editing: false
  }

  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    commentId: PropTypes.string.isRequired
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    //--------------------------------------------------------------------------
    // Viewing
    //--------------------------------------------------------------------------
    if(!this.state.editing) {
      return (
        <div>
          <div>
            <ContentPanel
              itemId={this.props.id}
              score={this.props.voteScore}
              onUpVote={() => null}
              onDownVote={() => null}
              onDelete={() => null}
              onEdit={() => this.setState({editing: true})}
              />
            <strong>{this.props.author}</strong> wrote:
          </div>
          <div>
            {this.props.body}
          </div>
        </div>
      );
    }
    //--------------------------------------------------------------------------
    // Editing
    //--------------------------------------------------------------------------
    else {
      return (
        <div>
          <FormControl
            componentClass="textarea"
            defaultValue={this.props.body}
            inputRef={input => this.body = input}
            />
            <div className='comment-commit'>
              <Button
                bsSize="small"
                onClick={() => {
                  this.setState({editing: false});
                }}>
                Done editing
              </Button>
            </div>
        </div>
      );
    }
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  return {
    ...state.comments[ownProps.commentId]
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);
