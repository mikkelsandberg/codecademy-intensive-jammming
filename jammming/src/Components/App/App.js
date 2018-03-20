import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify';

const debugging = false;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

    this.state = {
      searchTerm: '',
      searchResults: [],
      playlistTracks: [],
      playlistName: ''
    };
  }

  handleSearchTermChange(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  search(e) {
    e.preventDefault();
    if (this.state.searchTerm !== '') {
      Spotify.search(this.state.searchTerm).then(searchResults => {
        this.setState({
          searchResults: searchResults
        });
      });
    }
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(item => item.ID === track.ID) === undefined) {
      if (debugging) {console.log(`adding ${track.Name} by ${track.Artist} to the playlist`)}
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      })
      return;
    }
    if (debugging) {console.log(`${track.Name} by ${track.Artist} is already in the playlist; skipping`)}
    return;
  }

  removeTrack(track) {
    const tempPlaylist = this.state.playlistTracks.filter(item => item.ID !== track.ID);

    this.setState({
      playlistTracks: tempPlaylist
    })
    if (debugging) {console.log(`removing ${track.Name} by ${track.Artist}`)}
  }

  handlePlaylistNameChange(e) {
    this.setState({
      playlistName: e.target.value
    })
  }

  savePlaylist(e) {
    e.preventDefault();

    const trackURIs = [];

    this.state.playlistTracks.forEach(item => trackURIs.push(item.ID));

    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    this.setState({
      searchTerm: '',
      searchResults: [],
      playlistTracks: [],
      playlistName: ''
    });

    document.querySelectorAll('#searchBar input, #playlist input').forEach(input => input.value = '');

    return trackURIs;
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  render() {
    return (
      <div className="App">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar
          handleSearchTermChange={this.handleSearchTermChange}
          searchTerm={this.state.searchTerm}
          onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
          <Playlist
            playlistTracks={this.state.playlistTracks}
            playlistName={this.state.playlistName}
            handlePlaylistNameChange={this.handlePlaylistNameChange}
            onRemove={this.removeTrack}
            onSave={this.savePlaylist} />
        </div>
      </div>
    );
  }
}

export default App;
