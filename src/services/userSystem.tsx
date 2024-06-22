import { LoginType } from "../type/userSystem"

export class UserSystem {

    static async login(
        user: LoginType
    ) {
        const response = await fetch(
            'http://localhost:3000/login',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify(user)
              }
        )
        return response.json()
    }

    static async register() {
        const response = await fetch(
            'http://localhost:3000/'
        )
        return response.json()
    }

}