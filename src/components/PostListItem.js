//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'react-bootstrap';

//------------------------------------------------------------------------------
// Post List
//------------------------------------------------------------------------------
class PostListItem extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    const post = this.props.post;
    return (
      <ListGroupItem>
        <div className='list-item'>
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

export default PostListItem;
