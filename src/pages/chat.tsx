import { useEffect, useState } from 'react';
import { ContactType } from '../type/chatSystem';
import { ChatSystem } from '../services/chatsystem';
import Contact from '../components/chat/contact';
import '../assets/styles/pages/chat.css';
import contactBackground from '../assets/images/contact-background.svg'
import { useParams } from 'react-router-dom'

function Chat(){
  const { username } = useParams();
  
  const [Contacts, setContacts] = useState<ContactType[]>([]);
  useEffect(() => {
    ChatSystem.chat()
    .then( (data) => {
      if (data !== 200) {
        new Error('Sin contactos')
      }
      setContacts(data)
  })
  })

  return(
    <section className='chat-container'>
      <header>
        <h1>{username}</h1>
      </header>
      <div className='contact'>
        <img id='icon' src={contactBackground} alt="" />
        <div className='contact-list'>
          {Contacts.map( contact => <Contact username={contact.username}></Contact> )}
        </div>
      </div>
    </section>
  )
}

export default Chat