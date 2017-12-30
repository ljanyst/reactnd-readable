//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Panel } from 'react-bootstrap';
import sortBy from 'sort-by';

import { categoryExists } from '../utils/helpers';
import { getPosts } from '../utils/api';
import { setPosts } from '../actions/posts';

import PostListItem from './PostListItem';
import SortSettings from './SortSettings';
import WrongRoute from './WrongRoute';

//------------------------------------------------------------------------------
// Post List
//------------------------------------------------------------------------------
class PostList extends Component {
  //----------------------------------------------------------------------------
  // Mount the component
  //----------------------------------------------------------------------------
  componentDidMount() {
    getPosts(this.props.match.params.category)
      .then(data => this.props.setPosts(data));
  }

  //----------------------------------------------------------------------------
  // Update the state if props changed
  //----------------------------------------------------------------------------
  componentWillReceiveProps(nextProps) {
    const thisCategory = this.props.match.params.category;
    const nextCategory = nextProps.match.params.category;
    if(thisCategory !== nextCategory)
      getPosts(nextCategory)
        .then(data => this.props.setPosts(data));
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    //--------------------------------------------------------------------------
    // Check the route
    //--------------------------------------------------------------------------
    const { params } = this.props.match;
    var ok = true;

    if(params.category && this.props.categories.length &&
       categoryExists(params.category, this.props.categories) === false)
      ok = false;

    if(!ok)
      return (<WrongRoute />);

    //--------------------------------------------------------------------------
    // Figure out the title
    //--------------------------------------------------------------------------
    const title = params.hasOwnProperty('category')
          ? 'Posts for category "'+params.category+'":'
          : 'All posts:';

    //--------------------------------------------------------------------------
    // Figure out the shape of the list
    //--------------------------------------------------------------------------
    var list = (
      <Panel>
        <div className='list-no-posts'>No posts in this category.</div>
      </Panel>
    );

    if(this.props.posts.length)
      list = (
        <ListGroup>
          {this.props.posts.map(post => (
            <PostListItem
              key={post.id}
              post={post} />
          ))}
        </ListGroup>
      );

    //--------------------------------------------------------------------------
    // Return the final component
    //--------------------------------------------------------------------------
    return (
      <div>
        <h2>{title}</h2>
        <SortSettings type='posts'/>
        {list}
      </div>
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {
    ...state,
    posts: state.posts.sort(sortBy(`-${state.settings.sortKey.posts}`))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPosts: (data) => dispatch(setPosts(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
