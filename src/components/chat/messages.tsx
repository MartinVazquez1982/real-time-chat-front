import '../../assets/styles/components/messages.css'


interface props {
  date: string
  menssage: string
  isMine: boolean
}

function Message({
  date,
  menssage,
  isMine
}:props){
  return (
    <li 
      className="message" 
      style={{ alignItems: isMine ? 'flex-end' : 'flex-start' }}
    >
      <small
        style={{ color: isMine ? '#0f0' : '#f1f1f1' }}
      >
        {date}
      </small>
      <p
        style={{ color: isMine ? '#f1f1f1' : '#0f0' }}
      >
        {menssage}
      </p>
      <hr/>
    </li>
  )
}

export default Message