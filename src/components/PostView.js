//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 30.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Panel } from 'react-bootstrap';

import { postGet } from '../utils/api';
import { postUpdate } from '../actions/posts';

import PostContentPanel from './PostContentPanel';
import WrongRoute from './WrongRoute';
import Loading from './Loading';

//------------------------------------------------------------------------------
// Post View
//------------------------------------------------------------------------------
class PostView extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    editing: false,
    fetchError: false
  }

  //----------------------------------------------------------------------------
  // Mount the component
  //----------------------------------------------------------------------------
  componentDidMount() {
    postGet(this.props.match.params.postId)
      .then(data => this.props.postUpdate(data))
      .catch(() => this.setState({ fetchError: true }));
  }

  //----------------------------------------------------------------------------
  // Update the state if props changed
  //----------------------------------------------------------------------------
  componentWillReceiveProps(nextProps) {
    const thisPostId = this.props.match.params.postId;
    const nextPostId = nextProps.match.params.postId;
    if(thisPostId !== nextPostId)
      postGet(nextPostId)
        .then(data => this.props.postUpdate(data))
        .catch(() => this.setState({ fetchError: true }));
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    if(!('id' in this.props)) {
      if(this.state.fetchError)
        return (<WrongRoute />);
      else
        return (<Loading />);
    }

    const category = this.props.match.params.category;
    const title = (
      <div className='post-header'>
        <PostContentPanel
          postId={this.props.id}
          afterDelete={() => this.props.history.push(`/${category}`)}
          />
        {this.props.title}
        <span className='list-author'> - by {this.props.author}</span>
      </div>
    );

    return (
      <div className='col-md-6 col-md-offset-3'>
        <Panel header={title}>
          <div>
            {this.props.body}
          </div>
        </Panel>
      </div>
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.postId;
  if(postId in state.posts)
    return {...state.posts[postId]};
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    postUpdate: (data) => dispatch(postUpdate(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostView));
