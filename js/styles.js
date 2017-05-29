import { StyleSheet } from 'react-native';

import { constants } from './constants';

export const styles = StyleSheet.create({
  drawerWrapper: {
    width: 300
  },
  drawerHeader: {
    backgroundColor: constants.colors.brand1,
    height: 130,
    padding: 15
  },
  drawerLogoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  drawerLogo: {
    height: 100,
    width: 100
  },
  drawerButtonsWrapper: {
    paddingTop: 5,
    elevation: 2
  },
  drawerButtonView: {
    paddingBottom: 10,
    paddingLeft: 15,
    paddingTop: 10
  },
  drawerButtonText: {
    fontSize: 20
  },
  toolbar: {
    backgroundColor: constants.colors.brand1,
    height: 55,
    elevation: 2
  },
  newsRowSeparator: {
    backgroundColor: 'transparent',
    height: 1,
    flex: 1,
    marginHorizontal: 8
  },
  newsRowWrapper: {
    backgroundColor: constants.colors.gray,
    flex: 1
  },
  newsRowInsideWrapper: {
    marginHorizontal: 7
  },
  newsRowOneWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  newsRowListView: {
    elevation: 1
  },
  newsRowDate: {
    color: constants.colors.gray,
    fontSize: 12
  },
  newsRowImageWrapper: {
    flex: 1,
    marginVertical: 5
  },
  newsRowTitle: {
    fontSize: 15
  },
  newsOneTitle: {
    fontFamily: 'opensans_bold',
    fontSize: 20,
    marginVertical: 10
  },
  mainBroadcastWrapper: {
    backgroundColor: 'white',
    marginBottom: 10
  },
  mainBroadcastTextWrapper: {
    marginHorizontal: 15,
    marginVertical: 10
  },
  mainBroadcastText: {
    fontFamily: 'opensans_bold',
    fontSize: 20,
    marginVertical: 5
  },
  moreButtonWrapper: {
    marginHorizontal: 7,
    marginBottom: 15,
    marginTop: 10
  },
  moreButton: {
    backgroundColor: constants.colors.brand1,
    borderRadius: 3,
    color: 'white',
    fontFamily: 'opensans_bold',
    fontSize: 14,
    paddingVertical: 10
  },
  moreButtonDisabled: {
    backgroundColor: '#9e9e9e',
    color: constants.colors.gray
  },
  oneNewsScrollView: {
    backgroundColor: constants.colors.gray,
    elevation: 1,
    flex: 1,
    paddingHorizontal: 7
  },
  oneVideoTextWrapper: {
    marginHorizontal: 15,
    marginBottom: 10
  },
  oneVideoDate: {
    color: constants.colors.gray,
    fontSize: 12,
    marginBottom: 5
  },
  oneVideoTitle: {
    fontFamily: 'opensans_bold',
    fontSize: 20
  },
  oneScrolllViewWrapper: {
    flex: 1
  },
  broadcastText: {
    fontSize: 12,
    marginVertical: 10
  },
  youtube: {
    backgroundColor: 'black',
    alignSelf: 'stretch',
    height: 300,
    marginBottom: 10
  }
});
