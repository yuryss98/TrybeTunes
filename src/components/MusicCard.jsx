import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    musicasFavoritas: [],
    loading: false,
  }

  favoritarMusicas = async ({ target }, musica) => {
    this.setState({
      loading: true,
    });
    if (target.checked) {
      await addSong(musica);
      this.setState(({ musicasFavoritas }) => ({
        musicasFavoritas: [...musicasFavoritas, musica],
        loading: false,
      }));
    } else {
      await removeSong(musica);
      const { musicasFavoritas } = this.state;
      const newFavorites = musicasFavoritas.filter((e) => e.trackId !== musica.trackId);
      this.setState({
        musicasFavoritas: newFavorites,
        loading: false,
      });
    }
  }

  render() {
    const { musica } = this.props;
    const { loading, musicasFavoritas } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>

        <div>
          <p>
            {musica.trackName}
          </p>

          <audio data-testid="audio-component" src={ musica.previewUrl } controls>
            <track kind="captions" />
            <code>Audio</code>
          </audio>

          <label htmlFor={ musica.trackId }>
            <input
              type="checkbox"
              name=""
              id={ musica.trackId }
              checked={ musicasFavoritas.some((id) => id.trackId === musica.trackId) }
              data-testid={ `checkbox-music-${musica.trackId}` }
              onChange={ (event) => this.favoritarMusicas(event, musica) }
            />
            Favorita

          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
