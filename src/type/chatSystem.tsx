export interface ContactType {
    id: string
    username: string
    messagesPending: number
}

export interface MessageType {
    date: string
    message: string
    isMine: boolean
}

export interface PendingMessage{
    [username: string]: number
}
