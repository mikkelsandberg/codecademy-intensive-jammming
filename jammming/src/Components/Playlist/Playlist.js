import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <form onSubmit={this.props.onSave} id="playlist">
          <input
            placeholder="New Playlist"
            value={this.props.playlistName}
            onChange={this.props.handlePlaylistNameChange} />
          <button
            className="Playlist-save"
            form="playlist">Save to Spotify</button>
        </form>
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onRemove={this.props.onRemove} />
      </div>
    );
  }
}

export default Playlist;