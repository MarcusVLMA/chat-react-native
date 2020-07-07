import React from 'react';
import database from '@react-native-firebase/database';
import {GiftedChat} from 'react-native-gifted-chat';
import Background from '../components/Background';
import LoadingModal from '../components/LoadingModal';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      username: this.props.route.params.username,
      userId: this.props.route.params.userId,
      messages: [],
    };

    this.getMessagesHistory();
    this.setMessagesListener();
  }

  get messagesReference() {
    return database().ref('/messages');
  }

  componentWillUnmount() {
    // Unsubscribe from new messages.
    this.messagesReference.off();
  }

  parseSnapshotToChatFormat = (snapshot) => {
    const key = snapshot.key;
    const {...messageInfos} = snapshot.val();

    return {
      _id: key,
      ...messageInfos,
    };
  };

  parseChatFormatToDatabaseFormat = (message) => {
    return {
      text: message.text,
      createdAt: database.ServerValue.TIMESTAMP,
      user: {
        _id: this.state.userId,
        name: this.state.username,
      },
    };
  };

  addMessageListToChat = (messages) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  getMessagesHistory = () => {
    // Make one query to Realtime Database. Get all messages and add them to Chat.
    this.messagesReference.once('value', (snapshot) => {
      var messagesAsList = [];

      snapshot.forEach((snapshotItem) => {
        const message = this.parseSnapshotToChatFormat(snapshotItem);
        messagesAsList.push(message);
      });

      this.addMessageListToChat(messagesAsList.reverse());

      this.setState({
        loading: false,
      });
    });
  };

  setMessagesListener = () => {
    // Subscribe to check new messages added in database, starting now.
    // When a new message is detected, 'addMessageToChat' callback function is called.
    this.messagesReference
      .orderByChild('createdAt')
      .startAt(Date.now())
      .on('child_added', (snapshot) => {
        const message = this.parseSnapshotToChatFormat(snapshot);
        this.addMessageListToChat([message]);
      });
  };

  onSendMessages = (messages) => {
    messages.forEach((message) => {
      // Format message to database format, then push it to Realtime Database.
      let formattedMessage = this.parseChatFormatToDatabaseFormat(message);
      this.messagesReference.push(formattedMessage);
    });
  };

  render() {
    return (
      <Background>
        <LoadingModal visible={this.state.loading} />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSendMessages}
          renderAvatar={null}
          renderUsernameOnMessage={true}
          user={{
            _id: this.state.userId,
            name: this.state.username,
          }}
        />
      </Background>
    );
  }
}
