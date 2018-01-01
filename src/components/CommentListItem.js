//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 31.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl, Button, Glyphicon } from 'react-bootstrap';

import * as api from '../utils/api';
import {
  commentEdit, commentUpVote, commentDownVote, commentDelete
} from '../actions/comments';

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
              onUpVote={() => {
                api.commentVote(this.props.id, true)
                  .then(() => this.props.commentUpVote(this.props.id));
              }}
              onDownVote={() => {
                api.commentVote(this.props.id, false)
                  .then(() => this.props.commentDownVote(this.props.id));
              }}
              onDelete={() => {
                api.commentDelete(this.props.id)
                  .then(() => this.props.commentDelete(this.props.id));
              }}
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
                  const now = Date.now();
                  const body = this.body.value;
                  api.commentEdit(this.props.id, now, body)
                    .then(() => {
                      this.setState({editing: false});
                      this.props.commentEdit(this.props.id, now, body);
                    });
                }}>
                <Glyphicon glyph='ok'/>&nbsp;
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
  return {
    commentEdit: (id, timestamp, body) => {
      dispatch(commentEdit(id, timestamp, body));
    },
    commentUpVote: (id) => dispatch(commentUpVote(id)),
    commentDownVote: (id) => dispatch(commentDownVote(id)),
    commentDelete: (id) => dispatch(commentDelete(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);
