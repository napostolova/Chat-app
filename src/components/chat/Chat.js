import React, { useEffect, useState } from 'react';
import styles from './Chat.module.css'

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                author: username,
                room: room,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            setMessageList((list) => [...list, data])
        });
    }, [socket]);

    return (
        <section className={styles["chat-window"]}>
            <h2 className={styles.heading}>Live Chat</h2>
            <section className={styles["chat-body"]}>
                {messageList.map((messageContent) => {
                    return (
                        <section key={messageContent.author + Math.random()} className={styles[username === messageContent.author ? 'you' : 'other']}>
                            <div className={styles.author}>
                                <p>{messageContent.author}</p>
                            </div>
                            <div className={styles.message}>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className={styles.time}>
                                <p>{messageContent.time}</p>
                            </div>

                        </section>
                    )
                })}
            </section>
            <section className={styles["chat-footer"]}>
                <input type="text" placeholder="Type a message..."
                    className={styles['input-message']}
                    value={currentMessage}
                    onChange={(event) => { setCurrentMessage(event.target.value) }} />
                <button onClick={sendMessage}><span class="material-symbols-outlined">
                    send
                </span>
                </button>
            </section>
        </section>

    )
}
export default Chat;