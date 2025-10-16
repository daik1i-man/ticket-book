export type UniqueInputs = {
    User: {
        id?: number
        email?: string
    },
    Event: {
        id: number
    },
    Booking: {
        id?: number
        event_id?: number
        user_id?: number
    }
}