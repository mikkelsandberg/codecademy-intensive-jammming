import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props);
  }

  removeTrack() {
    this.props.onRemove(this.props);
  }

  renderAction() {
    return (this.props.isRemoval ? 'Remove from Playlist' : 'Add to Playlist');
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-image">
          <img src={this.props.Image} alt="album artwork" />
        </div>
        <div className="Track-information">
          <h3 title={this.props.Name}>{this.props.Name}</h3>
          <h4 title={this.props.Artist}>{this.props.Artist}</h4>
          <h4 title={this.props.Album}>{this.props.Album}</h4>
          <h5>{this.props.Date.split('-')[0]}</h5>
        </div>
        {
          this.props.isRemoval ?
          <a className="Track-action" onClick={this.removeTrack}>{this.renderAction()}</a> :
          <a className="Track-action" onClick={this.addTrack}>{this.renderAction()}</a>
        }
        
      </div>
    );
  }
}

export default Track;