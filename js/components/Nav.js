import React, { Component } from 'react';
import { Navigator, BackAndroid } from 'react-native';

import MainScene from './scenes/MainScene';
import BroadcastScene from './scenes/BroadcastScene';
import OneVideoScene from './scenes/OneVideoScene';
import AllNewsScene from './scenes/AllNewsScene';
import OneNewsScene from './scenes/OneNewsScene';

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.handleBack = () => {
      let routesHistory = this.refs.navigator.getCurrentRoutes();

      if (this.refs.navigator && routesHistory.length > 1) {
        //console.warn(routesHistory[routesHistory.length - 2].name);
        var output = '';
        for (var property in this.refs) {
          output += property + ': ' + this.refs[property]+'; ';
        }
        //console.warn(output);
        this.refs.navigator.pop();
        return true; //avoid closing the app
      }
      return false; //close the app
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'MainScene':
        return <MainScene navigator={navigator}/>
      case 'BroadcastScene':
        return <BroadcastScene navigator={navigator} route={route}/>
      case 'OneVideoScene':
        return <OneVideoScene navigator={navigator} route={route}/>
      case 'AllNewsScene':
        return <AllNewsScene navigator={navigator}/>
      case 'OneNewsScene':
        return <OneNewsScene navigator={navigator} route={route}/>
    }
  }

  push(route) {
    this.refs.navigator.push(route);
  }

  render() {
    return (
      <Navigator ref="navigator"
        initialRoute={{name: 'MainScene'}}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
      />
    )
  }
}
