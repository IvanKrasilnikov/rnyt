import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Youtube from './../Youtube';

import { constants } from './../../constants';
import { styles } from './../../styles';

export default class OneVideoScene extends Component {
  render() {
    const data = this.props.route.data;

    return (
      <ScrollView style={styles.oneScrolllViewWrapper}>
        <Youtube videoId={data.id.videoId}/>
        <View style={styles.oneVideoTextWrapper}>
          <Text style={styles.oneVideoDate}>
            {this.props.route.transformDate}
          </Text>
          <Text style={styles.oneVideoTitle}>
            {data.snippet.title}
          </Text>
        </View>
      </ScrollView>
    )
  }
}
