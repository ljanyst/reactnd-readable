//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 30.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Panel, FormControl, Button, Form, FormGroup, Col
} from 'react-bootstrap';

import * as api from '../utils/api';
import { postUpdate, postEdit } from '../actions/posts';

import PostContentPanel from './PostContentPanel';
import CommentList from './CommentList';
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
    api.postGet(this.props.match.params.postId)
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
      api.postGet(nextPostId)
        .then(data => this.props.postUpdate(data))
        .catch(() => this.setState({ fetchError: true }));
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    //--------------------------------------------------------------------------
    // Check if we can render the post
    //--------------------------------------------------------------------------
    if(!('id' in this.props)) {
      if(this.state.fetchError)
        return (<WrongRoute />);
      else
        return (<Loading />);
    }

    var header = null;
    var body = null;

    //--------------------------------------------------------------------------
    // Edition
    //--------------------------------------------------------------------------
    const edit = this.props.location.state && this.props.location.state.edit
          ? true
          : false;
    if(this.props.location.state)
      this.props.location.state.edit = false;

    if(this.state.editing || edit) {
      //------------------------------------------------------------------------
      // Edit header
      //------------------------------------------------------------------------
      header = (
        <div>
          <Form horizontal>
            <FormGroup controlId="formTitle">
              <Col sm={10}>
                <FormControl
                  type='text'
                  inputRef={input => this.title = input}
                  defaultValue={this.props.title} />
              </Col>
              <Col sm={2}>
                <Button
                  block
                  onClick={() => {
                    const title = this.title.value;
                    const body = this.body.value;
                    const id = this.props.id;
                    api.postEdit(id, title, body)
                      .then(() => {
                        this.props.postEdit(id, title, body);
                        this.setState( {editing: false } );
                      });
                  }}>
                  Save
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      );

      //------------------------------------------------------------------------
      // Edit body
      //------------------------------------------------------------------------
      body = (
        <div>
          <FormGroup controlId="formBody">
            <FormControl
              componentClass="textarea"
              inputRef={input => this.body = input}
              defaultValue={this.props.body} />
          </FormGroup>
        </div>
      );
    }

    //--------------------------------------------------------------------------
    // Viewing
    //--------------------------------------------------------------------------
    else {
      const category = this.props.match.params.category;
      header = (
        <div className='post-header'>
          <PostContentPanel
            postId={this.props.id}
            onEdit={() => this.setState({ editing: true })}
            afterDelete={() => this.props.history.push(`/${category}`)}
            />
          {this.props.title}
            <span className='list-author'> - by {this.props.author}</span>
        </div>
      );
      body = this.props.body;
    }

    //--------------------------------------------------------------------------
    // Render
    //--------------------------------------------------------------------------
    return (
      <div className='col-md-6 col-md-offset-3'>
        <Panel header={header}>
          <div>
            {body}
          </div>
          <hr />
          <CommentList postId={this.props.id}/>
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
    postUpdate: (data) => dispatch(postUpdate(data)),
    postEdit: (id, title, body) => dispatch(postEdit(id, title, body))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostView));
