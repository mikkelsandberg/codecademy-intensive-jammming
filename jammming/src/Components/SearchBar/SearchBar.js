import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

    this.state = {
      searchTerm: ""
    };
  }

  search(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchTerm)
  }

  handleTermChange(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    return (
      <form className="SearchBar" onSubmit={this.search} id="searchBar">
        <input
          type="text"
          placeholder="Enter A Song Title, Album, or Artist"
          onChange={this.handleTermChange} />
        <button form="searchBar">SEARCH</button>
      </form>
    );
  }
}

export default SearchBar;