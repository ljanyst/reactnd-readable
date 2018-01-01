//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 01.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Panel, FormControl, Button, Glyphicon
} from 'react-bootstrap';

import { postAdd } from '../utils/api';
import { makeId } from '../utils/helpers';

//------------------------------------------------------------------------------
// Add a new post
//------------------------------------------------------------------------------
class PostAdd extends Component {
  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    author: '',
    title: '',
    category: 'none',
    body: ''
  };

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    //--------------------------------------------------------------------------
    // Author input
    //--------------------------------------------------------------------------
    const author = (
      <div className='form-input'>
        <FormControl
          type='text'
          placeholder='Author'
          value={this.state.author}
          onChange={(e) => this.setState({author: e.target.value})}
        />
      </div>
    );

    //--------------------------------------------------------------------------
    // Title input
    //--------------------------------------------------------------------------
    const title = (
      <div className='form-input'>
        <FormControl
          type='text'
          placeholder='Title'
          value={this.state.title}
          onChange={(e) => this.setState({title: e.target.value})}
        />
      </div>
    );

    //--------------------------------------------------------------------------
    // Category selection
    //--------------------------------------------------------------------------
    const category = (
      <div className='form-input'>
        <FormControl
          componentClass="select"
          value={this.state.category}
          onChange={(e) => this.setState({category: e.target.value})}
        >
          <option value='none' disabled>Category</option>
          {this.props.categories.map(category => (
            <option
              key={category.path}
              value={category.path}
            >
              {category.name}
            </option>
          ))}
        </FormControl>
      </div>
    );

    //--------------------------------------------------------------------------
    // Post text
    //--------------------------------------------------------------------------
    const body = (
      <div className='form-input'>
        <FormControl
          componentClass="textarea"
          placeholder="Post text"
          style={{ height: 200 }}
          value={this.state.body}
          onChange={(e) => this.setState({body: e.target.value})}
        />
      </div>
    );

    //--------------------------------------------------------------------------
    // Submit button
    //--------------------------------------------------------------------------
    const submitButton = (
      <div className='form-commit'>
        <Button
          disabled={false}
          bsSize="small"
          onClick={() => {
            const post = {
              id: makeId(24),
              timestamp: Date.now(),
              title: this.state.title,
              body: this.state.body,
              author: this.state.author,
              category: this.state.category
            };
            postAdd(post)
              .then(() => this.props.history.push(`/${this.state.category}`));
          }}
        >
        <Glyphicon glyph='save'/>&nbsp;
        Post
        </Button>
      </div>
    );

    //--------------------------------------------------------------------------
    // Render the component
    //--------------------------------------------------------------------------
    return (
      <div className='col-md-6 col-md-offset-3'>
        <Panel header='Create a new post'>
          <div>
            {author}
            {title}
            {category}
            {body}
            {submitButton}
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
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostAdd));
