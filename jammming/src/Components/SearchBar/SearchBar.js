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

  search() {
    this.props.onSearch();
  }

  handleTermChange(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song Title, Album, or Artist"
          onChange={this.handleTermChange} />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;