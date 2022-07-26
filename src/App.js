import './App.css';
import { useState } from 'react';
import Chat from './components/chat/Chat';

import io from 'socket.io-client';

const apiUrl = 'http://localhost:3001';

const socket = io.connect(apiUrl);

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);


  const join = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }

  };

  return (
    <div className="App">
      {
        !showChat ? (

          <section className="join-to-chat">
            <h2>Join To Live Chat</h2>
            <input className="username" type="texte" placeholder="Type your name" value={username}
              onChange={(event) => { setUsername(event.target.value) }} />
            <input className="room" type="text" placeholder="Type room ID" value={room}
              onChange={(event) => { setRoom(event.target.value) }} />

            <button className="join-btn" onClick={join}>JOIN</button>
          </section>
        )
          :
          (
            <Chat socket={socket} username={username} room={room} />

          )}
    </div>
  );
}

export default App;
