import PropTypes, { shape } from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { musicas } = this.props;
    const newArray = musicas.slice(1);
    return (
      <div>
        {newArray.map((musica) => (
          <div key={ musica.trackName }>
            <p>
              {musica.trackName}
            </p>
            <audio data-testid="audio-component" src={ musica.previewUrl } controls>
              <track kind="captions" />
              <code>Audio</code>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicas: PropTypes.arrayOf(shape({
    trackName: PropTypes.string,
  })).isRequired,
};
