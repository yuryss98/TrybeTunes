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
      artistaName: '',
      artistaAlbum: '',
    };
  }

  componentDidMount() {
    this.fetchMusicApi();
  }

  async fetchMusicApi() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      musicasEncontradas: response.slice(1),
      artistaName: response[0].artistName,
      artistaAlbum: response[0].collectionName,
    });
  }

  render() {
    const { musicasEncontradas, artistaAlbum, artistaName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        Album
        {
          musicasEncontradas.length > 0 && (
            <div>
              <p data-testid="artist-name">{ artistaName }</p>
              <p data-testid="album-name">{ artistaAlbum }</p>
              <div>
                {musicasEncontradas.map(
                  (music) => <MusicCard key={ music.trackId } musica={ music } />,
                )}
              </div>
            </div>
          )
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
