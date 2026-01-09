import { useState, useEffect, useRef  } from 'react';
import {useLocation} from 'react-router';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import UsersContainer from '../UsersContainer/UsersContainer';

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null)

  // const ENDPOINT = 'localhost:5000';
  const ENDPOINT = 'chat-app-2021.herokuapp.com';

  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

     socketRef.current = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socketRef.current.emit('join', { name, room }, () => {

    });

    return () => {
      // socket.emit('disconnect');
      socketRef.current.disconnect();

      socketRef.current.off()
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socketRef.current.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages]);

  useEffect(() => {
    socketRef.current.on('roomData', ({ users }) => {
      setUsers(users);
    })
  }, [users])

  // function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socketRef.current.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="outer-container">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <UsersContainer users={users} />
    </div>
  )
};

export default Chat;