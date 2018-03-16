import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input placeholder="New Playlist" />
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onRemove={this.props.onRemove} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;