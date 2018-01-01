//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 01.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl, Button, Glyphicon } from 'react-bootstrap';

import * as api from '../utils/api';
import { commentAdd } from '../actions/comments';

import { makeId } from '../utils/helpers';

//------------------------------------------------------------------------------
// Comment input
//------------------------------------------------------------------------------
class CommentInput extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    body: '',
    author: ''
  };

  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    return (
      <div>
        <FormControl
          value={this.state.author}
          type='text'
          placeholder="Write down your name..."
          onChange={(event) => this.setState({author: event.target.value})}
          />
          <FormControl
            value={this.state.body}
            componentClass="textarea"
            placeholder="Write a new comment..."
            onChange={(event) => this.setState({body: event.target.value})}
            />
          <div className='comment-commit'>
            <Button
              disabled={this.state.author && this.state.body ? false : true}
              bsSize='small'
              onClick={() => {
                const comment = {
                  id: makeId(24),
                  timestamp: Date.now(),
                  body: this.state.body,
                  author: this.state.author,
                  parentId: this.props.postId
                };
                api.commentAdd(comment)
                  .then(() => {
                    this.props.commentAdd({...comment, voteScore: 0});
                  });
                this.setState({body: '', author: ''});
              }}
              >
              <Glyphicon glyph='comment'/>&nbsp;
              Post
            </Button>
          </div>
      </div>
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    commentAdd: (comment) => dispatch(commentAdd(comment))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
