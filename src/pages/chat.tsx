import { useEffect, useState } from 'react'
import { ContactType, MessageType, PendingMessage } from '../type/chatSystem'
import { ChatSystem } from '../services/chatsystem'
import { format } from 'date-fns';
import Contact from '../components/chat/contact'
import '../assets/styles/pages/chat.css'
import contactBackground from '../assets/images/contact-background.svg'
import { useParams } from 'react-router-dom'
import UserChat from '../components/chat/userChat'
import LogOut from '../components/chat/logout';
import noChat from '../assets/images/no-chat.svg'

function Chat(){
  
  const { username } = useParams();
  
  const [messages, setMessages] = useState<MessageType[]>([])

  const [ contSelect, setContSelect ] = useState(false)
  const [ userSelect, setUserSelect ] = useState('')

  const [ pendingMessages, setPendingMessages ] = useState<PendingMessage>({})

  const updatePendingMessages = (username: string) => {
    setPendingMessages(prevState => ({
      ...prevState,
      [username]: (prevState[username] || 0) + 1
    }))
  }

  const resetPendingMessages = (username: string) => {
    setPendingMessages(prevState => ({
      ...prevState,
      [username]: 0 
    }))
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm')
  }

  const openChat = (username: string) => {
    if (username !== userSelect) {
      setContSelect(true)
      setUserSelect(username)
      ChatSystem.getMessages(username)
        .then( (data => {
          const oldMessages = (data as MessageType[]).map(message => ({
            ...message,
            date: formatDate(message.date),
          }))
          setMessages(oldMessages)
        }))
        .catch ( () => {
          setMessages([])
        })
        .finally( () => {
          resetPendingMessages(username)
        })
    }
  }
 
  useEffect(() => {
    ChatSystem.chat()
    .then( (data) => {
      if (data !== 200) {
        new Error('Sin contactos')
      }
      (data as ContactType[]).map(contact => {
        resetPendingMessages(contact.username)
      })
  })
  }, [])

  const socket = ChatSystem.getSocket()

  socket.on('chat_message', (message, from, to, formattedDateTime) => {
    const isMine = to !== username
    if (isMine || userSelect === from){
      const newMessage = {
        'date': formatDate(formattedDateTime),
        'message': message,
        'isMine': isMine
      }
  
      setMessages([...messages, newMessage])
    } else {
      updatePendingMessages(from)
    }
  })

  const sendMessage = (message: string) => {
    const now = new Date()
    const pad = (num: number) => (num < 10 ? '0' + num : num);
    const formattedDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    socket.emit('chat_message', message, userSelect, formattedDateTime)
  }

  return(
    <section className='chat-container'>
      <header>
        <LogOut></LogOut>
        <h1>{username}</h1>
      </header>
      <div className='contact'>
        <img id='icon' src={contactBackground} alt="" />
        <div className='contact-list'>
          {Object.entries(pendingMessages).map(([username, size])  => 
            <Contact 
              key={username} 
              username={username} 
              openChat={openChat}
              pendingMessages={size}
            ></Contact> )}
        </div>
      </div>
      <div className='chat'>
        { contSelect ? 
            <UserChat 
              user={userSelect}
              messages={messages}
              sendMessage={sendMessage}
            /> 
          : 
            <div id='no-chat'>
              <div>
                <img src={noChat} />
              </div>
            </div> 
        }
      </div>
    </section>
  )
}

export default Chat