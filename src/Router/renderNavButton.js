/**
 * @providesModule RNRFToolBox.Router.renderNavButton
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { Platform, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Utils
import DeviceUtils from 'app/utils/DeviceUtils';

function renderNavButton(position, options) {
  const { iconClass: IconClass = FontAwesome, iconName, iconSize = 25, onPress } = options;

  const containerStyle = [
    styles.navButton,
    position === 'right' ? styles.rightButton : styles.leftButton,
  ];

  return (
    <Button containerStyle={containerStyle} onPress={onPress}>
      <IconClass color="white" name={iconName} size={iconSize} />
    </Button>
  );
}

export function renderLeftButton(options) {
  return () => renderNavButton('left', options);
}

export function renderRightButton(options) {
  return () => renderNavButton('right', options);
}

export function renderBackButton() {
  const options = {
    onPress: Actions.pop,
    ...Platform.select({
      android: { iconClass: MaterialIcons, iconName: 'arrow-back', iconSize: 30 },
      ios: { iconClass: Entypo, iconName: 'chevron-left', iconSize: 35 },
    }),
  };

  return renderNavButton('left', options);
}

const styles = StyleSheet.create({
  navButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginTop: -10,
    marginHorizontal: -10,
    ...Platform.select({
      android: {
        height: DeviceUtils.navBarHeight - 8,
        width: DeviceUtils.navBarHeight - 8,
      },
      ios: {
        height: DeviceUtils.navBarHeight,
        width: DeviceUtils.navBarHeight,
      },
    }),
  },
  leftButton: {
    marginTop: -8,
    alignItems: 'flex-end',
  },
  rightButton: {
    alignItems: 'flex-start',
  },
});
