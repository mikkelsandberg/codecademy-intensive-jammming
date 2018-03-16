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
    return (this.props.isRemoval ? '-' : '+');
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
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