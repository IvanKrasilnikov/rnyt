import React, { Component } from 'react';

import { constants } from './../constants';
import { styles } from './../styles';

import YouTubePlayer from 'react-native-youtube';

export default class Youtube extends Component {
  render() {
    return (
      <YouTubePlayer
        ref="youtubePlayer"
        rel={false}
        videoId={this.props.videoId}
        play={false}
        showinfo={false}
        fullscreen={true}
        apiKey={constants.youtube.apiKey}
        style={styles.youtube}
      />
    )
  }
}
