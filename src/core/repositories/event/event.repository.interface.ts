import { Event } from "../../../schema/event/event.schema";

export interface IEventRepository {
    findMany(): Promise<Event[]>
    findUnique(id: number): Promise<Event | null>
    create(params: { name: string, total_seats: number }): Promise<Event>
    update(id: number, params: { name: string, total_seats: number }): Promise<Event>
    delete(id: number): Promise<Event>
}