import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }
  playAudio(track){
    if (this.unavialable_track(track)) { return; }
    
    var preview_url = this.track_url(track);
    let audio = new Audio(preview_url);
    if (!this.state.playing){
      audio.play();
      this.setState({
        playing: true,
        playingUrl: preview_url,
        audio
      });
    }else{
      if (preview_url === this.state.playingUrl){
        this.state.audio.pause();
        this.setState({playing: false});
      }else{
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: preview_url,
          audio
        });
      }
    }
  }

  unavialable_track(track){
    return !this.track_url(track)
  }

  track_url(track){
    return track.preview_url;
  }

  render(){
    const { tracks } = this.props;
    return (
      <div className="Gallery">
        {
          tracks.map((track, k) => {
            const trackImg = track.album.images[0].url;
            return (
              <div key={k} className="track" onClick={() => this.playAudio(track)}>
                <img src={trackImg} className="track-img" alt="Track" />
                <div className="track-play">
                  <div className="track-play-inner">
                    {
                      this.unavialable_track(track)
                      ? <span>X</span>
                      : (this.state.playingUrl === this.track_url(track) && this.state.playing
                        ? <span>| |</span>
                        : <span>&#9654;</span>
                        )
                    }
                  </div>
                </div>
                <p className="track-text">{track.name}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Gallery;