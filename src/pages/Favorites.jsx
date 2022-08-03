// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Favorites extends Component {
  state = {
    favoritesMusics: [],
    loading: false,
  }

  async componentDidMount() {
    this.handleChange();
  }

  handleChange = async () => {
    this.setState({
      loading: true,
    });
    const musicasDoLs = await getFavoriteSongs();
    this.setState({
      favoritesMusics: musicasDoLs,
      loading: false,
    });
  }

  render() {
    const { favoritesMusics, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        {
          !favoritesMusics || loading ? <Loading /> : (
            <div>
              {favoritesMusics.map(
                (music) => (
                  <MusicCard
                    key={ music.trackId }
                    musica={ music }
                    handleChange={ this.handleChange }
                  />),
              )}
            </div>
          )
        }
      </div>
    );
  }
}
