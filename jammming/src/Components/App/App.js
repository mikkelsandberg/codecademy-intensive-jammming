import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);

    this.state = {
      searchResults: [
        {
          id: 0,
          name: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water"
        },
        {
          id: 1,
          name: "Tiny Dancer",
          artist: "Tim McGraw",
          album: "Love Story"
        },
        {
          id: 2,
          name: "Tiny Dancer",
          artist: "Rockabye Baby!",
          album: "Lullaby Renditions of Elton John"
        },
        {
          id: 3,
          name: "Tiny Dancer",
          artist: "The White Raven",
          album: "Tiny Dancer"
        },
        {
          id: 4,
          name: "Tiny Dancer",
          artist: "Ben Folds",
          album: "Ben Folds Live"
        },
        {
          id: 7,
          name: "It's Not Right But It's Okay",
          artist: "Whitney Houston",
          album: "My Love Is Your Love"
        }
      ],
      playlistTracks: [
        {
          id: 5,
          name: "Stronger",
          artist: "Britney Spears",
          album: "Oops!... I Did It Again"
        },
        {
          id: 6,
          name: "So Emotional",
          artist: "Whitney Houston",
          album: "Whitney"
        },
        {
          id: 7,
          name: "It's Not Right But It's Okay",
          artist: "Whitney Houston",
          album: "My Love Is Your Love"
        }
      ],
      playlistName: ""
    };
  }

  addTrack(track) {
    this.setState({
      playlistTracks: [...this.state.playlistTracks, track]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
          <Playlist
            playlistTracks={this.state.playlistTracks}
            playlistName={this.state.playlistName}
            updatePlayListName={this.updatePlaylistName} />
        </div>
      </div>
    );
  }
}

export default App;
