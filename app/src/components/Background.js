import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import BackgroundImage from '../assets/background.jpeg';

export default function Background(props) {
  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View style={styles.content}>{props.children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#000000A0',
  },
});
