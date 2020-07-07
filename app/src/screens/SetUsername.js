import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Background from '../components/Background';

export default function SetUsername(props) {
  const [username, setUsername] = useState();

  const handlePressGoChat = async () => {
    // Get username, generate a random userId, then redirect to Chat Screen
    const userId = Math.round(Math.random() * 10000000);
    props.navigation.navigate('ChatScreen', {username, userId});
  };

  return (
    <Background>
      <KeyboardAvoidingView style={styles.content}>
        <Text style={styles.title}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Set a username for you'}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handlePressGoChat}>
          <Text style={styles.buttonText}>Go chat!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 90,
  },
  title: {
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 18,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 0.3,
    paddingVertical: 3,
    paddingHorizontal: 9,
    backgroundColor: '#FFFFFF',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
    width: '80%',
  },
  buttonContainer: {
    backgroundColor: '#0078D7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
