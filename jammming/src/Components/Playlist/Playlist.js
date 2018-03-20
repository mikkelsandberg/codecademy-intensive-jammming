import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSave} className="Playlist" id="playlist">
        <input
          placeholder="New Playlist"
          onChange={this.props.handlePlaylistNameChange} />
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onRemove={this.props.onRemove} />
        <button
          className="Playlist-save"
          form="playlist">SAVE TO SPOTIFY</button>
      </form>
    );
  }
}

export default Playlist;