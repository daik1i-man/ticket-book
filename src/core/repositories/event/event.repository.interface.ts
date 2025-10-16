import { EventFormDto } from "././../../../types/dtos/event/event.dto";
import { UniqueInputs } from "../../../types/unique.inputs.types";
import { Event } from "../../../schema/event/event.schema";

export interface IEventRepository {
    findMany(): Promise<Event[]>
    findUnique(UniqueInputs: UniqueInputs['Event']): Promise<Event | null>
    create(params: EventFormDto): Promise<Event>
    update(UniqueInputs: UniqueInputs['Event'], params: EventFormDto): Promise<Event>
    delete(UniqueInputs: UniqueInputs['Event']): Promise<Event>
}