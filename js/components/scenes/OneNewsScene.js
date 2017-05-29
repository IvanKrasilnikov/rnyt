import React, { Component } from 'react';
import { Text, View, ScrollView, WebView, Dimensions } from 'react-native';

import FitImage from 'react-native-fit-image';
import MyWebView from 'react-native-webview-autoheight';

import { constants } from './../../constants';
import { styles } from './../../styles';

export default class OneNewsScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realWidth: ''
    }
  }

  widthOrHeight() {
    let {width, height} = Dimensions.get('window');
    if (width < height) {
      this.setState({realWidth: width})
    } else {
      this.setState({realWidth: height})
    }
  }

  render() {
    const data = this.props.route.data;

    return (
      <ScrollView style={styles.oneNewsScrollView}>
        <View style={styles.newsRowOneWrapper}>
          <Text style={styles.newsRowDate}>
            {this.props.route.transformDate}
          </Text>
          <View style={styles.newsRowImageWrapper}>
            <FitImage
            source={{uri: data.img}}
            />
          </View>
          <Text style={styles.newsOneTitle}>
            {data.title}
          </Text>
          <MyWebView
            width={this.state.realWidth}
            scalesPageToFit={false}
            onLoad={(e) => this.widthOrHeight()}
            source={{html: `
              <!DOCTYPE html>\n
              <html>
                <head>
                  <title>requiredd</title>
                  <meta http-equiv="content-type" content="text/html; charset=utf-8">
                  <meta name="viewport" content="width=device-width, user-scalable=no">
                  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=cyrillic" rel="stylesheet">
                  <style type="text/css">
                    body {
                      color: #757575;
                      font: 14px/1.5 'Open Sans';
                      margin: 0;
                      padding: 0 30px 15px 0;
                    }
                    * {
                      max-width: 100% !important;
                    }
                  </style>
                </head>
                <body>
                  ${data.text}
                </body>
              </html>
              `}}
            />
        </View>
      </ScrollView>
    )
  }
}
