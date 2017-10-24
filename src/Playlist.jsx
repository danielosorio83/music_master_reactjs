import React, { Component } from 'react';
import './App.css';
import Profile from './Profile'
import Gallery from './Gallery'

class Playlist extends Component {
  constructor(props){
    super(props);
    this.state = {
      playlist_tracks: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({playlist_tracks: {}});
    this.load_playlist_tracks(nextProps.playlists);
  }

  load_playlist_tracks(playlists) {
    var playlist_tracks = this.state.playlist_tracks;
    console.log('playlists', playlists)
    playlists.items.forEach(playlist => {
      if (playlist.public === false) { return ''; }
      playlist_tracks[playlist.id] = [];

      const FETCH_URL = `${playlist.tracks.href}?limit=8`
      fetch(FETCH_URL, this.props.shared.my_options())
        .then(response => response.json())
        .then(json => {
          const { items } = json;
          // console.log('playlist/tracks/items', items);
          items.forEach(item => {
            playlist_tracks[playlist.id].push(item.track);
          });
          this.setState({playlist_tracks});
        });  
    });
  }

  render(){
    const { playlists } = this.props;
    return (
      <div className="Playlists">
        <hr />
        <h2>Playlists</h2>
        {
          playlists.items.map((playlist, k) => {
            if (playlist.public === false || !this.state.playlist_tracks[playlist.id]) { return ''; }
            return (
              <div key={k} className="Playlist">
                <Profile
                  artist={playlist}
                />
                <Gallery
                  tracks={this.state.playlist_tracks[playlist.id]}
                />
                <hr />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Playlist;