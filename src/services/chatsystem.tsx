import io from 'socket.io-client'

export class ChatSystem {
  
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

  static getSocket() {
    const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] })
    return socket
  }
}
