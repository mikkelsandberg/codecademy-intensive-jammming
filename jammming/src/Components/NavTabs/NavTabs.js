import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavTabs.css';

class NavTabs extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink exact to='/' activeClassName="selected">Search Results</NavLink></li>
          <li><NavLink exact to='/playlist' activeClassName="selected">Playlist</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default NavTabs;