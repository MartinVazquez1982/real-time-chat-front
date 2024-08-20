import { useEffect, useState, useRef } from 'react'
import { ContactType, MessageType } from '../type/chatSystem'
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

  const contSelect = useRef(false)
  const userSelect = useRef('')

  const [ pendingMessages, setPendingMessages ] = useState<ContactType[]>([])

  const updatePendingMessages = (username: string) => {
    setPendingMessages(prevState => {
      const contactIndex = prevState.findIndex(contact => contact.username === username)
      
      // Extrae el contacto y actualiza `pendingMessages`
      const [contactToMove]: ContactType[] = prevState.splice(contactIndex, 1)
      contactToMove.messagesPending++

      // Coloca el contacto al principio del array
      return [contactToMove, ...prevState];
    })
  }

  const resetPendingMessages = (username: string) => {
    setPendingMessages(prevState =>
      prevState.map(contact =>
        contact.username === username
          ? { ...contact, messagesPending: 0 }
          : contact
      )
    )
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm')
  }

  const openChat = (username: string) => {
    if (username !== userSelect.current) {
      contSelect.current = true
      userSelect.current = username
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

  const getUserSelect = () => {
    return userSelect.current
  }

  const receiveMessage = (message: string, from: string, to: string, formattedDateTime: string, userSelect: string) => {
    const isMine = to !== username
    if (isMine || userSelect === from){
      const newMessage = {
        'date': formatDate(formattedDateTime),
        'message': message,
        'isMine': isMine
      }
      
      setMessages((messages) => [...messages, newMessage])
    } else {
      console.log('pase')
      updatePendingMessages(from)
    }
  }
 
  useEffect(() => {
    ChatSystem.chat()
      .then( (data) => {
        if (data !== 200) {
          new Error('Sin contactos')
        }
        setPendingMessages(data as ContactType[])
      })
    ChatSystem.loadSocket(receiveMessage, getUserSelect)
  }, [])

  const sendMessage = (message: string) => {
    const now = new Date()
    const pad = (num: number) => (num < 10 ? '0' + num : num);
    const formattedDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    ChatSystem.sendMessage(message, userSelect.current, formattedDateTime)
  }

  return(
    <section className='chat-container'>
      <header>
        <LogOut />
        <h1>{username}</h1>
      </header>
      <div className='contact'>
        <img id='icon' src={contactBackground} alt="" />
        <div className='contact-list'>
          {pendingMessages.map( contact  => 
            <Contact 
              key={contact.username} 
              username={contact.username} 
              openChat={openChat}
              pendingMessages={contact.messagesPending}
            ></Contact> )}
        </div>
      </div>
      <div className='chat'>
        { contSelect.current ? 
            <UserChat 
              user={userSelect.current}
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