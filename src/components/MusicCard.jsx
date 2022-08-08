import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    musicasFavoritas: [],
    loading: false,
    musicasLocalStorage: [],
    isChecked: false,
  }

  async componentDidMount() {
    const pegandoDoLocalStorage = await getFavoriteSongs();
    this.setState({
      musicasLocalStorage: pegandoDoLocalStorage,
      musicasFavoritas: pegandoDoLocalStorage,
    }, () => {
      const { musica } = this.props;
      this.setState(({ musicasLocalStorage }) => ({
        isChecked: musicasLocalStorage.some((music) => music.trackId === musica.trackId),
      }));
    });
  }

  favoritarMusicas = async ({ target }, musica) => {
    const { handleChange } = this.props;
    this.setState({
      loading: true,
    });
    if (target.checked) {
      await addSong(musica);
      this.setState(({ musicasFavoritas }) => ({
        musicasFavoritas: [...musicasFavoritas, musica],
        loading: false,
        isChecked: true,
      }));
    } else {
      await removeSong(musica);
      const { musicasFavoritas } = this.state;
      const newFavorites = musicasFavoritas.filter((e) => e.trackId !== musica.trackId);
      this.setState({
        musicasFavoritas: newFavorites,
        loading: false,
        isChecked: false,
      }, handleChange);
    }
  }

  render() {
    const { musica } = this.props;
    const { loading, isChecked } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <div className="achou">
          <p>
            {musica.trackName}
          </p>
          <div className="testando">
            <audio data-testid="audio-component" src={ musica.previewUrl } controls>
              <track kind="captions" />
              <code>Audio</code>
            </audio>

            <label htmlFor={ musica.trackId } className="test2">
              <input
                className="test"
                type="checkbox"
                name=""
                id={ musica.trackId }
                checked={ isChecked }
                data-testid={ `checkbox-music-${musica.trackId}` }
                onChange={ (event) => this.favoritarMusicas(event, musica) }
              />

              <i className="fa-solid fa-heart" />

            </label>
          </div>
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
  handleChange: PropTypes.func,
};

MusicCard.defaultProps = {
  handleChange: () => {},
};
