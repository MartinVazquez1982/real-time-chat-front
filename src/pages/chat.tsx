import { useEffect, useState } from 'react'
import { ContactType } from '../type/chatSystem'
import { ChatSystem } from '../services/chatsystem'
import Contact from '../components/chat/contact'
import '../assets/styles/pages/chat.css'
import contactBackground from '../assets/images/contact-background.svg'
import { useParams } from 'react-router-dom'
import UserChat from '../components/chat/userChat'
import noChat from '../assets/images/no-chat.svg'
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] })

function Chat(){
  const { username } = useParams();
  
  const [Contacts, setContacts] = useState<ContactType[]>([])

  const [ contSelect, setContSelect ] = useState(false)
  const [ userSelect, setUserSelect ] = useState('')

  const openChat = (username: string) => {
    setContSelect(true)
    setUserSelect(username)
  }
 
  useEffect(() => {
    ChatSystem.chat()
    .then( (data) => {
      if (data !== 200) {
        new Error('Sin contactos')
      }
      setContacts(data)
  })
  }, [])

  return(
    <section className='chat-container'>
      <header>
        <h1>{username}</h1>
      </header>
      <div className='contact'>
        <img id='icon' src={contactBackground} alt="" />
        <div className='contact-list'>
          {Contacts.map( contact => <Contact username={contact.username} openChat={openChat}></Contact> )}
        </div>
      </div>
      <div className='chat'>
        { contSelect ? 
            <UserChat user={userSelect}/> 
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