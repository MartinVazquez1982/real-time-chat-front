import { LoginType, RegisterType } from "../type/userSystem"
import { API_REAL_TIME_CHAT_URL } from '../utils/config'

export class UserSystem {

    static async login(
        user: LoginType
    ) {
        const response = await fetch(
            `${API_REAL_TIME_CHAT_URL}/auth/login`,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include'
            }
        )
        const data = await response.json()
        
        if (!response.ok) {
          if (response.status === 401) {
            throw Error(data.message)
          } else if(response.status >= 500) {
            throw Error('There was a problem processing your request. Please try again later.')
          } else {
            throw Error('Unexpected error. Please try again later.')
          }
        }

        return data
    }

  static async register(
    newUser: RegisterType
  ) {
    const response = await fetch(
      `${API_REAL_TIME_CHAT_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newUser)
      }
    )
    const data = await response.json()
        
    if (!response.ok) {
      if (400 <= response.status && response.status <= 500) {
        throw Error(data.message)
      } else if(response.status >= 500) {
        throw Error('There was a problem processing your request. Please try again later.')
      } else {
        throw Error('Unexpected error. Please try again later.')
      }
    }

    return data
  }

  static async logout() {
    const response = await fetch(
      `${API_REAL_TIME_CHAT_URL}/auth/logout`,
      {
        method: 'POST',
        credentials: 'include'
      }
    )
    return response
  }
}