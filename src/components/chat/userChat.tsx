import { useState } from 'react'
import '../../assets/styles/components/userChat.css'
import Message from './messages'

interface props {
  user: string
}

function UserChat({ user }: props){

  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {

  }


  return (
    <>
      <div className='header-contact'>
        <div>
          <h1>{user}</h1>
        </div>
      </div>
      <div className='messages'>
        <div>
          <ul>
            <Message date='11/7/2001' menssage='hola' isMine={false}/>
            <Message date='11/7/2001' menssage='hola' isMine={true}/>
          </ul>
        </div>
      </div>
       <div className='input-messages'>
        <div className='new-messages'>
          <textarea 
            placeholder='Ingrese su mensaje'
            value={message}
            onChange={handleChange}/>
          <button onClick={sendMessage}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#0f0" stroke="none">
                  <path d="M2480 4346 c-1273 -425 -2329 -780 -2346 -789 -46 -24 -101 -92 -120
                  -150 -42 -127 25 -284 142 -333 18 -7 531 -156 1140 -330 610 -174 1114 -321
                  1120 -328 7 -6 154 -510 328 -1120 174 -609 323 -1122 330 -1140 49 -116 196
                  -181 327 -143 63 19 131 73 158 126 35 69 1561 4666 1561 4702 0 151 -133 281
                  -284 278 -26 0 -900 -287 -2356 -773z m1039 -632 l-1026 -1026 -1094 312
                  c-602 172 -1098 315 -1104 318 -8 5 4211 1419 4240 1421 5 1 -452 -461 -1016
                  -1025z m513 -1304 c-390 -1168 -711 -2120 -714 -2115 -3 6 -146 502 -318 1104
                  l-312 1094 1023 1023 c563 563 1024 1022 1026 1020 1 -1 -316 -958 -705 -2126z"/>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default UserChat