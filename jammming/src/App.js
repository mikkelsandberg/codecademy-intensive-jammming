import React, { Component } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar />
        <div className="App-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    );
  }
}

export default App;
