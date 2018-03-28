import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return (
              <Track
                key={track.ID}
                ID={track.ID}
                Name={track.Name}
                Artist={track.Artist}
                Album={track.Album}
                Image={track.Image}
                Date={track.Date}
                isRemoval={this.props.isRemoval}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove} />
            )
          })
        }
      </div>
    )
  }
}

export default TrackList;