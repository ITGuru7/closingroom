import React, { Component } from 'react';
import { connect } from 'react-redux';

import { db } from '../../firebase';

import { getFormattedDate, getFormattedTime } from '../../functions';
import assets from '../../assets';

const INITIAL_STATE = {
  message: '',
}

class MessagesPanel extends Component {
  state = { ...INITIAL_STATE };

  handleSendMessage = () => {
    const { authUser, room, receiver_uid } = this.props;
    const {message} = this.state;
    if (message) {
      db.doCreateMessage(room.rid, authUser.uid, receiver_uid, message)
      this.setState({
        message: '',
      });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.keyCode == 13 || event.charCode == 13) {
      event.preventDefault();

      this.handleSendMessage();
    }
  }

  renderContent = (message) => (
    <div className="d-flex justify-content-start">
      <div className="content p-2 mr-2">
        {message.content}
      </div>
      <div className="timestamp align-self-end">
        <span className="time mr-1">{getFormattedTime(new Date(message.date), true)}</span>
        <span className="date">{getFormattedDate(new Date(message.date))}</span>
      </div>
    </div>
  )

  renderMessage = (key, message, isFirst, displayUser, isAuthUser) => {
    const { users } = this.props;
    let sender = users[message.sender_uid]
    return (
      <div key={key} className={`message-block d-flex flex-row align-items-center my-1 ${isFirst?'mt-auto':''}`}>
        <div className="user-block d-flex justify-content-center">
          {displayUser &&
            <div className={`user ${isAuthUser?"user-self":""} d-flex justify-content-center align-items-center`}>
              <span>{sender.displayname.charAt(0)}</span>
            </div>
          }
        </div>
        <div className="content-block">
          {this.renderContent(message)}
        </div>
      </div>
    )
  }

  renderMessages = () => {
    const { authUser, room, receiver_uid } = this.props;
    const { messages } = room;

    var sender_uid = null
    return Object.keys(messages).map(key => {
      let message = messages[key]
      if (message.receiver_uid == receiver_uid) {
        const isFirst = (sender_uid == null)
        let displayUser = false
        if (message.sender_uid != sender_uid) {
          sender_uid = message.sender_uid
          displayUser = true
        }
        const isAuthUser = (message.sender_uid === authUser.uid)
        return this.renderMessage(key, message, isFirst, displayUser, isAuthUser)
      }
    })
  }

  scrollToBottom = () => {
    const {msg_block} = this.refs;
    msg_block.scrollTop = msg_block.scrollHeight - msg_block.clientHeight;
  }
  componentDidMount() {
    this.scrollToBottom()
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const { message } = this.state;

    return (
      <div className="messages-panel flex-grow-1 d-flex flex-column">
        <div className="messages-block flex-grow-1 my-3" ref={`msg_block`}>
          {this.renderMessages()}
        </div>
        <div className="send-message-block d-flex justify-content-center align-items-center px-5">
          <div className="col-10 offset-1">
            <input
              name="message"
              value={message}
              onChange={this.onChange}
              onKeyPress={(event) => this.handleKeyPress(event)}
              type="text"
              placeholder="Message.."
              className="form-control"
            />
          </div>
          <img src={assets.file}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, room }) => {
  return {
    authUser,
    room,
  };
};

export default connect(mapStateToProps)(MessagesPanel);
