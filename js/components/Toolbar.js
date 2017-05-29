import React, { Component } from 'react';
import { ToolbarAndroid } from 'react-native';

import { constants } from './../constants';
import { styles } from './../styles';

export default class Toolbar extends Component {
  onActionSelected(position) {
    if (position === 0) { // index of 'Settings'
      this.props.toolbarRef.refs.drawerLayout.openDrawer();
    }
  }

  render() {
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        title={constants.defaults.title}
        titleColor={'white'}
        actions={[{
          title: 'Menu',
          icon: constants.imgs.menuIcon,
          show: 'always',
          showWithText: false
        }]}
        onActionSelected={this.onActionSelected.bind(this)}
        />
    )
  }
}
