import React, { Component } from 'react';
import './App.css';
import Shared from './Shared.js';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile'
import Gallery from './Gallery'
import Playlist from './Playlist'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      playlists: {items: []},
      shared: null
    };
  }

  componentWillMount() {
    let shared = new Shared();
    shared.my_options();
    this.setState({shared});
  }

  search(){
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists';
    let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;

    fetch(FETCH_URL, this.state.shared.my_options())
      .then(response => response.json())
      .then(json => {
        console.log('artist', json);
        const artist = json.artists.items[0];
        this.setState({artist})

        FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`
        fetch(FETCH_URL, this.state.shared.my_options())
          .then(response => response.json())
          .then(json => {
            console.log('artist/top-tracks', json);
            const { tracks } = json;
            this.setState({tracks});
          });

        FETCH_URL = `${BASE_URL}?type=playlist&q=${artist.name}&limit=5`
        fetch(FETCH_URL, this.state.shared.my_options())
          .then(response => response.json())
          .then(json => {
            console.log('artist/playlists', json);
            const { playlists } = json;
            this.setState({playlists});
          });
      });
  }

  render(){
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist"
              query={this.state.query}
              onChange={event => { this.setState({query: event.target.value}) }}
              onKeyPress={event => {
                  if (event.key === 'Enter'){
                    this.search();
                  }
                }
              }
            />
            <InputGroup.Addon onClick={ () => this.search() }>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
              <Playlist
                playlists={this.state.playlists}
                shared={this.state.shared}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;