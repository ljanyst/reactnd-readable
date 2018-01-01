//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 29.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { categorySetList } from '../actions/categories';
import { categoryGetList } from '../utils/api';

//------------------------------------------------------------------------------
// The navigation bar
//------------------------------------------------------------------------------
class ReadableNav extends Component {

  //----------------------------------------------------------------------------
  // Get the categories from the data server and store in redux
  //----------------------------------------------------------------------------
  componentDidMount() {
    categoryGetList().then((categories) => {
      this.props.categorySetList(categories);
    });
  }

  //----------------------------------------------------------------------------
  // Render the component
  //----------------------------------------------------------------------------
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Glyphicon glyph='home'/> Readable
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/add-post">
              <NavItem><Glyphicon glyph='plus'/> Add Post</NavItem>
            </LinkContainer>
            <NavDropdown
              title="Post Categories"
              id="basic-nav-dropdown">
              {this.props.categories.map(({name, path}) => (
                <LinkContainer key={path} to={'/'+path}>
                  <MenuItem>{name}</MenuItem>
                </LinkContainer>
              ))}
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}

//------------------------------------------------------------------------------
// The redux connection
//------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {categories: state.categories};
}

function mapDispatchToProps(dispatch) {
  return {
    categorySetList: (data) => dispatch(categorySetList(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableNav));
