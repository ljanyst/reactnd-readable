//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 31.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentPanel from './ContentPanel';
import { postUpVote, postDownVote, postDelete } from '../actions/posts';
import * as api from '../utils/api';

//------------------------------------------------------------------------------
// Post Content Panel
//------------------------------------------------------------------------------
class PostContentPanel extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    postId: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
    editHref: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    afterDelete: PropTypes.func
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    const post = this.props;
    return (
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
          if(this.props.afterDelete)
            this.props.afterDelete();
        })}
        onEdit={this.props.onEdit}
        editHref={this.props.editHref}
        />
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  return {
    ...state.posts[ownProps.postId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postUpVote: (id) => dispatch(postUpVote(id)),
    postDownVote: (id) => dispatch(postDownVote(id)),
    postDelete: (id) => dispatch(postDelete(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContentPanel);
