//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'react-bootstrap';
import findBy from 'array-find-by';

import ContentPanel from './ContentPanel';
import { postUpVote, postDownVote, postDelete } from '../actions/posts';
import * as api from '../utils/api';

//------------------------------------------------------------------------------
// Post List
//------------------------------------------------------------------------------
class PostListItem extends Component {
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
    const post = this.props;
    return (
      <ListGroupItem>
        <div className='list-item'>
          <ContentPanel
            itemId={post.id}
            score={post.voteScore}
            onUpVote={() => api.postVote(post.id, true).then(() => {
              this.props.postUpVote(post.id);
            })}
            onDownVote={() => api.postVote(post.id, false).then(() => {
              this.props.postDownVote(post.id);
            })}
            onDelete={() => api.postDelete(post.id).then(() => {
              this.props.postDelete(post.id);
            })}
            />
          <strong>
            <Link to={`${post.category}/${post.id}`}>
              {post.title}
            </Link>
          </strong>
          <span className='list-author'> - by {post.author}</span>
          <span className='list-comments'> ({post.commentCount} comments)</span>
        </div>
      </ListGroupItem>
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  const match = findBy.call(state.posts, 'id', ownProps.postId);
  return {
    ...state.posts[match[1]]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postUpVote: (id) => dispatch(postUpVote(id)),
    postDownVote: (id) => dispatch(postDownVote(id)),
    postDelete: (id) => dispatch(postDelete(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem);
