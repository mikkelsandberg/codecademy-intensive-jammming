import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  render() {
    return (
      <form className="SearchBar" onSubmit={this.props.onSearch} id="searchBar">
        <input
          type="text"
          value={this.props.searchTerm}
          placeholder="Enter A Song Title, Album, or Artist"
          onChange={this.props.handleSearchTermChange} />
        <button className="SearchButton" form="searchBar">SEARCH</button>
      </form>
    );
  }
}

export default SearchBar;