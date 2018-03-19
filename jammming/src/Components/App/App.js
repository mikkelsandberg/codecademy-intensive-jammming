import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [
        {
          ID: 0,
          Name: "Tiny Dancer",
          Artist: "Elton John",
          Album: "Madman Across The Water"
        },
        {
          ID: 1,
          Name: "Tiny Dancer",
          Artist: "Tim McGraw",
          Album: "Love Story"
        },
        {
          ID: 2,
          Name: "Tiny Dancer",
          Artist: "Rockabye Baby!",
          Album: "Lullaby Renditions of Elton John"
        },
        {
          ID: 3,
          Name: "Tiny Dancer",
          Artist: "The White Raven",
          Album: "Tiny Dancer"
        },
        {
          ID: 4,
          Name: "Tiny Dancer",
          Artist: "Ben Folds",
          Album: "Ben Folds Live"
        },
        {
          ID: 7,
          Name: "It's Not Right But It's Okay",
          Artist: "Whitney Houston",
          Album: "My Love Is Your Love"
        }
      ],
      playlistTracks: [
        {
          ID: 5,
          Name: "Stronger",
          Artist: "Britney Spears",
          Album: "Oops!... I Did It Again"
        },
        {
          ID: 6,
          Name: "So Emotional",
          Artist: "Whitney Houston",
          Album: "Whitney"
        },
        {
          ID: 7,
          Name: "It's Not Right But It's Okay",
          Artist: "Whitney Houston",
          Album: "My Love Is Your Love"
        }
      ],
      playlistName: ""
    };
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(item => item.ID === track.ID) === undefined) {
      console.log(`adding ${track.Name} by ${track.Artist} to the playlist`);
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      })
      return;
    }
    console.log(`${track.Name} by ${track.Artist} is already in the playlist; skipping`);
    return;
  }

  removeTrack(track) {
    const tempPlaylist = this.state.playlistTracks.filter(item => item.ID !== track.ID);

    this.setState({
      playlistTracks: tempPlaylist
    })
    console.log(`removing ${track.Name} by ${track.Artist}`);
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.forEach(item => trackURIs.push(item.id));
    return trackURIs;
  }

  search(term) {
    if (term !== '') {
      Spotify.search(term).then(searchResults => {
        this.setState({
          searchResults: searchResults
        });
      });
    }
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar
          onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
          <Playlist
            playlistTracks={this.state.playlistTracks}
            playlistName={this.state.playlistName}
            onNameChange={this.updatePlaylistName}
            onRemove={this.removeTrack}
            onSave={this.savePlaylist} />
        </div>
      </div>
    );
  }
}

export default App;
