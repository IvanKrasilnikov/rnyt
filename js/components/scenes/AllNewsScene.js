import React, { Component } from 'react';
import { Text, View, ListView, TouchableHighlight } from 'react-native';

import Button from 'react-native-button';
import FitImage from 'react-native-fit-image';
import LocalizedStrings from 'react-native-localization';

import { transformDate } from './../../transformDate';
import { constants } from './../../constants';
import { styles } from './../../styles';

let data = [];
const strings = new LocalizedStrings(constants.localized.lists);

export default class AllNewsScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: ds.cloneWithRows(data),
      moreButtonViewHeight: 0,
      moreButtonDisabled: false,
      curNewsShow: 10,
      prevItems: []
    };
  }

  componentDidMount() {
    this.getTheData(function(json) {
      data = json;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          data.slice(0, this.state.curNewsShow)
        ),
        prevItems: data.slice(0, this.state.curNewsShow)
      });
    }.bind(this));
  }

  getTheData(callback) {
    fetch(strings.requestLink.news)
      .then((response) => response.json())
      .then((json) => callback(json))
      .catch(function(error) {
        console.warn(error);
      });
  }

  linkToOneNews(rowData) {
    this.props.navigator.push({
      name: 'OneNewsScene',
      data: rowData,
      transformDate: transformDate(rowData.date, strings.locale)
    });
  }

  showMoreList() {
    let buttonDisabled = false;

    if ((this.state.curNewsShow + 10) >= data.length) {
      buttonDisabled = true;
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.prevItems.concat(
        data.slice(this.state.curNewsShow, (this.state.curNewsShow + 10))
      )),
      prevItems: this.state.prevItems.concat(
        data.slice(this.state.curNewsShow, (this.state.curNewsShow + 10))
      ),
      curNewsShow: this.state.curNewsShow + 10,
      moreButtonViewHeight: 0,
      moreButtonDisabled: buttonDisabled
    });
  }

  renderSeparator(rowId) {
    return (
      <View
        key={rowId}
        style={styles.newsRowSeparator}
      />
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
          onPress = {this.linkToOneNews.bind(this, rowData)}>
          <View style={styles.newsRowOneWrapper}>
            <Text style={styles.newsRowDate}>
              {transformDate(rowData.date, strings.locale)}
            </Text>
            <View style={styles.newsRowImageWrapper}>
              <FitImage
                source={{uri: rowData.img}}
              />
            </View>
            <Text style={styles.newsRowTitle}>
              {rowData.title}
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
          renderRow={this.renderRow.bind(this)}
          renderSeparator={(sectionId, rowId) => this.renderSeparator(rowId)}
          renderFooter={this.renderFooter.bind(this)}
          enableEmptySections={true}
          onEndReached={() => this.setState({moreButtonViewHeight: 'auto'})}
        />
      </View>
    )
  }
}
