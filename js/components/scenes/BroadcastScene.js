import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import FitImage from 'react-native-fit-image';
import MyWebView from 'react-native-webview-autoheight';

import Youtube from './../Youtube';

import { constants } from './../../constants';
import { styles } from './../../styles';

export default class BroadcastScene extends Component {
  renderVideo() {
    if (this.props.route.id != 'none') {
      return <Youtube videoId={this.props.route.id}/>
    }
  }

  render() {
    return (
      <ScrollView style={styles.oneScrolllViewWrapper}>
        {this.renderVideo()}
        <View style={styles.oneVideoTextWrapper}>
            <Text style={styles.oneVideoTitle}>
              {this.props.route.title}
            </Text>
            <Text style={styles.broadcastText}>
              {this.props.route.text}
            </Text>
        </View>
      </ScrollView>
    )
  }
}
