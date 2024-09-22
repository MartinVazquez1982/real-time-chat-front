import io, { Socket } from 'socket.io-client'
import { API_REAL_TIME_CHAT_URL } from '../utils/config'

export class ChatSystem {

  static socket: Socket | null = null
  
  static async chat() {
    const response = await fetch(`${API_REAL_TIME_CHAT_URL}/chat/contact`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
    return response.json()
  }

  static async getMessages(to: string) {
    const response = await fetch(`${API_REAL_TIME_CHAT_URL}/chat/messages/${to}`,
      {
        method: 'GET',
        credentials: 'include'
      })
    return response.json()
  }

  static async loadSocket(
    receiveMessage: (message: string, from: string, to: string, formattedDateTime: string) => void,
    userConnected: (user: string) => void,
    userdisconnected: (user: string) => void
  ) {
    ChatSystem.socket = io(`${API_REAL_TIME_CHAT_URL}`, { transports: ['websocket', 'polling', 'flashsocket'] })
    ChatSystem.socket.on('chat_message', (message, from, to, formattedDateTime) => {
      receiveMessage(message, from, to, formattedDateTime)
    })
    ChatSystem.socket.on('user_connected', (connected) => {
      userConnected(connected)
    })
    ChatSystem.socket.on('user_desconected', (disconnected) => {
      userdisconnected(disconnected)
    })
  }

  static async sendMessage(message: string, to: string, formattedDateTime: string) {
    if (ChatSystem.socket !== null) {
      ChatSystem.socket.emit('chat_message', message, to, formattedDateTime)
    }
  }

  static async logoutSocket() {
    if (ChatSystem.socket !== null && ChatSystem.socket.connected) {
      ChatSystem.socket.disconnect()
    }
  }

  static async messagesViewed (to: string) {
    if (ChatSystem.socket !== null) {
      ChatSystem.socket.emit('viewed', to)
    }
  }

  static async userConnected (user: string) {
    if (ChatSystem.socket !== null) {
      ChatSystem.socket.emit('user_connected', user)
    }
  }
}
