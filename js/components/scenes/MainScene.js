import React, { Component } from 'react';
import { Text, View, ListView, TouchableHighlight } from 'react-native';

import Button from 'react-native-button';
import FitImage from 'react-native-fit-image';
import MyWebView from 'react-native-webview-autoheight';
import LocalizedStrings from 'react-native-localization';

import { transformDate } from './../../transformDate';
import { constants } from './../../constants';
import { styles } from './../../styles';

let dataYoutubeList = [];
const strings = new LocalizedStrings(constants.localized.lists);

export default class MainScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id.videoId !== r2.id.videoId});
    this.state = {
      dataSource: ds.cloneWithRows(dataYoutubeList),
      prevDataYoutubeList: [],
      moreButtonViewHeight: 0,
      moreButtonDisabled: false,
      nextPageToken: '',
      mainYoutubeId: '',
      mainImgUrl: 'not_empty_string',
      mainTitle: '',
      mainText: ''
    };
  }

  componentDidMount() {
    this.getTheDataBroadcast(function(json) {
      if (json.broadcasting) {
        this.setState({
          mainYoutubeId: json.broadcasting_on.youtubeId,
          mainImgUrl: `https://img.youtube.com/vi/${json.broadcasting_on.youtubeId}/hqdefault.jpg`,
          mainTitle: json.broadcasting_on.title,
          mainText: json.broadcasting_on.text
        });
      } else {
        this.setState({
          mainTitle: json.broadcasting_off.title,
          mainText: json.broadcasting_off.text
        });
        if (json.broadcasting_off.youtubeId == '') {
          this.setState({
            mainYoutubeId: 'none',
            mainImgUrl: 'not_empty_string'
          });
        } else {
          this.setState({
            mainYoutubeId: json.broadcasting_off.youtubeId,
            mainImgUrl: `https://img.youtube.com/vi/${json.broadcasting_off.youtubeId}/hqdefault.jpg`
          });
        }
      }
    }.bind(this));

    this.getTheDataYoutubeList(function(json) {
      let nextPageToken = '';
      dataYoutubeList = json.items;
      if (json.nextPageToken) { nextPageToken = json.nextPageToken}
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataYoutubeList),
        prevDataYoutubeList: dataYoutubeList,
        nextPageToken: nextPageToken
      });
    }.bind(this));
  }

  getTheDataBroadcast(callback) {
    fetch(strings.requestLink.broadcast)
      .then((response) => response.json())
      .then((json) => callback(json))
      .catch(function(error) {
        console.warn(error);
      });
  }

  getTheDataYoutubeList(callback) {
    fetch('https://www.googleapis.com/youtube/v3/search?key=' +
          constants.youtube.apiKey +
          '&channelId=' +
          constants.youtube.channelId +
          '&part=snippet,id&order=date&maxResults=' +
          constants.youtube.resultsInRequest +
          '&pageToken=' +
          this.state.nextPageToken)
      .then((response) => response.json())
      .then((json) => callback(json))
      .catch(function(error) {
        console.warn(error);
      });
  }

  linkToBroadcast(dataArr) {
    this.props.navigator.push({
      name: 'BroadcastScene',
      id: dataArr[0],
      img: dataArr[1],
      title: dataArr[2],
      text: dataArr[3]
    });
  }

  linkToOneVideo(rowData) {
    this.props.navigator.push({
      name: 'OneVideoScene',
      data: rowData,
      transformDate: transformDate(rowData.snippet.publishedAt, strings.locale)
    });
  }

  showMoreList() {
    this.getTheDataYoutubeList(function(json) {
      let nextPageToken;
      let buttonDisabled = false;

      dataYoutubeList = json.items;

      if (json.nextPageToken) {
        nextPageToken = json.nextPageToken
      } else {
        nextPageToken = '';
        buttonDisabled = true;
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.prevDataYoutubeList.concat(dataYoutubeList)),
        prevDataYoutubeList: this.state.prevDataYoutubeList.concat(dataYoutubeList),
        nextPageToken: nextPageToken,
        moreButtonViewHeight: 0,
        moreButtonDisabled: buttonDisabled
      });
    }.bind(this));
  }

  renderBroadcastImage() {
    if (this.state.mainImgUrl != 'not_empty_string') {
      return (
        <FitImage
          originalWidth={480}
          originalHeight={270}
          source={{uri: this.state.mainImgUrl}}
        />
      )
    }
  }

  renderSeparator(rowId) {
    return (
      <View
        key={rowId}
        style={styles.newsRowSeparator}
      />
    )
  }

  renderHeader() {
    return (
      <View style={styles.mainBroadcastWrapper}>
        <TouchableHighlight
          underlayColor={constants.colors.gray}
          onPress = {this.linkToBroadcast.bind(this, [
            this.state.mainYoutubeId,
            this.state.mainImgUrl,
            this.state.mainTitle,
            this.state.mainText
          ])}>
          <View>
            {this.renderBroadcastImage()}
            <View style={styles.mainBroadcastTextWrapper}>
              <Text style={styles.mainBroadcastText}>
                {this.state.mainTitle}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={[
          {height: this.state.moreButtonViewHeight},
          styles.moreButtonWrapper
        ]}>
        <Button
          onPress={() => (this.showMoreList())}
          disabled={this.state.moreButtonDisabled}
          style={styles.moreButton}
          styleDisabled={styles.moreButtonDisabled}>
          {strings.moreText.toUpperCase()}
        </Button>
      </View>
    )
  }

  renderRow(rowData) {
    return (
      <View style={styles.newsRowInsideWrapper}>
        <TouchableHighlight
          underlayColor={constants.colors.gray}
          onPress = {this.linkToOneVideo.bind(this, rowData)}>
          <View style={styles.newsRowOneWrapper}>
            <Text style={styles.newsRowDate}>
              {transformDate(rowData.snippet.publishedAt, strings.locale)}
            </Text>
            <View style={styles.newsRowImageWrapper}>
              <FitImage
                originalWidth={480}
                originalHeight={270}
                source={{uri: rowData.snippet.thumbnails.high.url}}
              />
            </View>
            <Text style={styles.newsRowImageWrapper}>
              {rowData.snippet.title}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.newsRowWrapper}>
        <ListView
          style={styles.newsRowListView}
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader.bind(this)}
          renderRow={this.renderRow.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
          renderSeparator={(sectionId, rowId) => this.renderSeparator(rowId)}
          enableEmptySections={true}
          onEndReached={() => this.setState({moreButtonViewHeight: 'auto'})}
        />
      </View>
    )
  }
}
