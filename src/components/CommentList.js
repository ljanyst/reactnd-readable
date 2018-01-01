//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 31.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import sortBy from 'sort-by';

import { commentGetList } from '../utils/api';
import { commentSetList } from '../actions/comments';

import SortSettings from './SortSettings';
import CommentListItem from './CommentListItem';
import CommentInput from './CommentInput';

//------------------------------------------------------------------------------
// Comment List
//------------------------------------------------------------------------------
class CommentList extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  //----------------------------------------------------------------------------
  // Mount the component
  //----------------------------------------------------------------------------
  componentDidMount() {
    commentGetList(this.props.postId)
      .then(data => this.props.commentSetList(data));;
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    return (
      <div>
        <h4>Comments:</h4>
        <Table striped responsive bordered hover>
          <tbody>
            <tr>
              <td>
                <CommentInput postId={this.props.postId}/>
              </td>
            </tr>
            <tr>
              <td>
                <SortSettings type='comments'/>
              </td>
            </tr>
            {this.props.comments.length
              ? this.props.comments.map(comment => (
                <tr key={comment.id}>
                  <td>
                    <CommentListItem
                      key={comment.id}
                      commentId={comment.id}
                      />
                  </td>
                </tr>
              ))
             : (
               <tr>
                 <td>
                   <div className='comment-none'>No comments yet.</div>
                 </td>
               </tr>
             )
            }
          </tbody>
        </Table>
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
    comments: Object.keys(state.comments).map((key) => {
      return state.comments[key];
    }).sort(sortBy(`-${state.settings.sortKey.comments}`))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentSetList: (data) => dispatch(commentSetList(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
