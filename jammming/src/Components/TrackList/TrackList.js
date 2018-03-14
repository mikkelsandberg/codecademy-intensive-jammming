import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  setKey(key) {
    return ++key;
  }

  render() {
    return (
      <div className="TrackList">
        {
          this.props.trackList.map((track, key) => {
            return (
              <Track
                key={this.setKey(key)}
                trackName={track.trackName}
                artistName={track.artistName}
                albumName={track.albumName}
                isRemoval={this.props.isRemoval} />
            )
          })
        }
      </div>
    )
  }
}

export default TrackList;