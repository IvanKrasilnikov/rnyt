import React, { Component } from 'react';
import {
  Text, View, Image, StyleSheet, DrawerLayoutAndroid,
  TouchableOpacity, WebView, Linking
} from 'react-native';

import LocalizedStrings from 'react-native-localization';

import { constants } from './../constants';
import { styles } from './../styles';

import Toolbar from './Toolbar';
import Youtube from './Youtube';

const strings = new LocalizedStrings(constants.localized.drawer);

export default class Drawer extends Component {
  closeDrawerLayout() {
    this.refs.drawerLayout.closeDrawer();
  }

  render() {
    var navigationView = (
      <View style={styles.drawerWrapper}>
        <View style={styles.drawerHeader}>
          <View style={styles.drawerLogoWrapper}>
            <Image
              source={constants.imgs.logo}
              style={styles.drawerLogo}
              />
          </View>
        </View>
        <View style={styles.drawerButtonsWrapper}>
          <TouchableOpacity
            style={styles.drawerButtonView}
            underlayColor={constants.colors.gray}
            onPress={() => {
              this.props.onNavigate({name:'MainScene'});
              this.closeDrawerLayout();
            }}>
            <Text
              style={styles.drawerButtonText}>
              TV
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerButtonView}
            underlayColor={constants.colors.gray}
            onPress={() => {
              this.props.onNavigate({name:'AllNewsScene'});
              this.closeDrawerLayout();
            }}>
            <Text
              style={styles.drawerButtonText}>
              {strings.newsText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerButtonView}
            underlayColor={constants.colors.gray}
            onPress={() => {
              Linking.openURL(strings.calendarLink);
              this.closeDrawerLayout();
            }}>
            <Text
              style={styles.drawerButtonText}>
              {strings.calendarText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerButtonView}
            underlayColor={constants.colors.gray}
            onPress={() => {
              Linking.openURL(strings.tableLink);
              this.closeDrawerLayout();
            }}>
            <Text
              style={styles.drawerButtonText}>
              {strings.tableText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerButtonView}
            underlayColor={constants.colors.gray}
            onPress={() => {
              Linking.openURL(strings.academyLink);
              this.closeDrawerLayout();
            }}>
            <Text
              style={styles.drawerButtonText}>
              {strings.academyText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerButtonView}
            underlayColor={constants.colors.gray}
            onPress={() => {
              Linking.openURL(strings.eSportsLink);
              this.closeDrawerLayout();
            }}>
            <Text
              style={styles.drawerButtonText}>
              E-Sports
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    return (
      <DrawerLayoutAndroid
        ref="drawerLayout"
        draweWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <Toolbar
          ref='toolbar'
          toolbarRef={this}
          />
        {this.props.children}
      </DrawerLayoutAndroid>
    )
  }
}
