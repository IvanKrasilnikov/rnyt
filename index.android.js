import React, { Component, PropTypes } from 'react';
import { AppRegistry } from 'react-native';

import SplashScreen from "rn-splash-screen";
import { setCustomText } from 'react-native-global-props';

import Drawer from './js/components/Drawer';
import Nav from './js/components/Nav';

const customTextProps = {
  style: {
    fontFamily: 'opensans'
  }
};

setCustomText(customTextProps);

export default class ReactNativeYoutube extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Drawer onNavigate={(route) => {this.refs.nav.push(route)}}>
        <Nav ref="nav"/>
      </Drawer>
    )
  }
}

AppRegistry.registerComponent('ReactNativeYoutube', () => ReactNativeYoutube);
