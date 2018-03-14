import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.trackList.map(track => {
            return (<Track
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