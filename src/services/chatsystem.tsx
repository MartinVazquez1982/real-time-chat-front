export class ChatSystem {

    static async chat() {
        const response = await fetch('http://localhost:3000/chat/contact',
            {
                method: 'GET',
                credentials: 'include'
            })
        return response.json()
    }
}
