import React from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';

export default function LoadingModal({visible}) {
  return (
    <Modal
      visible={visible}
      style={styles.container}
      animationType="fade"
      transparent={true}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#0078D7" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000A9',
  },
});
