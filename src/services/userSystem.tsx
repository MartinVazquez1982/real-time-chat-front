import { LoginType, RegisterType } from "../type/userSystem"

export class UserSystem {

    static async login(
        user: LoginType
    ) {
        const response = await fetch(
            'http://localhost:3000/auth/login',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include'
            }
        )
        return response.json()
    }

    static async register(
        newUser: RegisterType
    ) {
        const response = await fetch(
            'http://localhost:3000/auth/register',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify(newUser)
            }
        )
        return response.json()
    }
}