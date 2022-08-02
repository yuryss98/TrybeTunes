import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicasEncontradas: [],
    };
  }

  componentDidMount() {
    this.fetchMusicApi();
  }

  async fetchMusicApi() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      musicasEncontradas: response,
    });
  }

  render() {
    const { musicasEncontradas } = this.state;
    // console.log(musicasEncontradas);

    return (
      <div data-testid="page-album">
        <Header />
        Album
        {
          musicasEncontradas.length > 0
          && <p data-testid="artist-name">{ musicasEncontradas[0].artistName }</p>
        }

        {
          musicasEncontradas.length > 0
          && <p data-testid="album-name">{ musicasEncontradas[0].collectionName }</p>
        }

        {
          musicasEncontradas.length > 0 && <MusicCard musicas={ musicasEncontradas } />
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
