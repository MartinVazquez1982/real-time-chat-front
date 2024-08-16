import io, { Socket } from 'socket.io-client'

export class ChatSystem {

  static socket: Socket | null = null
  
  static async chat() {
    const response = await fetch('http://localhost:3000/chat/contact',
      {
        method: 'GET',
        credentials: 'include'
      })
    return response.json()
  }

  static async getMessages(to: string) {
    const response = await fetch(`http://localhost:3000/chat/messages/${to}`,
      {
        method: 'GET',
        credentials: 'include'
      })
    return response.json()
  }

  static loadSocket(
    receiveMessage: (message: string, from: string, to: string, formattedDateTime: string, userSelect: string) => void,
    getUserSelect: () => string
  ) {
    ChatSystem.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] })
    ChatSystem.socket.on('chat_message', (message, from, to, formattedDateTime) => {
      receiveMessage(message, from, to, formattedDateTime, getUserSelect())
    })
  }

  static sendMessage(message: string, to: string, formattedDateTime: string) {
    if (ChatSystem.socket !== null) {
      ChatSystem.socket.emit('chat_message', message, to, formattedDateTime)
    }
  }

  static logoutSocket() {
    if (ChatSystem.socket !== null && ChatSystem.socket.connected) {
      ChatSystem.socket.disconnect()
    }
  }
}
