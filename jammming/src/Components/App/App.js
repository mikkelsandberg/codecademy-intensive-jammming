import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          trackName: "Tiny Dancer",
          artistName: "Elton John",
          albumName: "Madman Across The Water"
        },
        {
          trackName: "Tiny Dancer",
          artistName: "Tim McGraw",
          albumName: "Love Story"
        },
        {
          trackName: "Tiny Dancer",
          artistName: "Rockabye Baby!",
          albumName: "Lullaby Renditions of Elton John"
        },
        {
          trackName: "Tiny Dancer",
          artistName: "The White Raven",
          albumName: "Tiny Dancer"
        },
        {
          trackName: "Tiny Dancer",
          artistName: "Ben Folds",
          albumName: "Ben Folds Live"
        }
      ],
      playlist: [
        {
          trackName: "Stronger",
          artistName: "Britney Spears",
          albumName: "Oops!... I Did It Again"
        },
        {
          trackName: "So Emotional",
          artistName: "Whitney Houston",
          albumName: "Whitney"
        },
        {
          trackName: "It's Not Right But It's Okay",
          artistName: "Whitney Houston",
          albumName: "My Love Is Your Love"
        }
      ],
      playlistName: "New Playlist"
    };
  }

  updatePlayListName(e) {
    this.setState({
      playlistName: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar />
        <div className="App-playlist">
          <SearchResults
            trackList={this.state.searchResults}
            action="+" />
          <Playlist
            trackList={this.state.playlist}
            action="-"
            playListName={this.state.playlistName}
            updatePlayListName={this.updatePlaylistName} />
        </div>
      </div>
    );
  }
}

export default App;
