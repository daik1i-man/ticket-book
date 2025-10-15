import { Event } from "../../../schema/event/event.schema";

export interface IEventRepository {
    findMany(params?: any): Promise<Event[]>
    findUnique(params: any): Promise<Event | null>
    create(params: any): Promise<Event>
    update(params: any): Promise<Event>
    delete(params: any): Promise<Event>
}