import { EventRepository } from "../../core/repositories/event/event.repository";
import { validateMiddleware } from "../../middleware/validation.middleware";
import { EventController } from "../../controllers/event/event.controller";
import { EventService } from "../../core/services/event/event.service";
import { EventFormDto } from "../../types/dtos/event/event.dto";
import { Router } from 'express';

const eventRouter = Router();

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

eventRouter.get('/', eventController.findMany.bind(eventController));
eventRouter.get('/:event_id', eventController.findUnique.bind(eventController));
eventRouter.post('/', validateMiddleware(EventFormDto), eventController.create.bind(eventController));
eventRouter.put('/:event_id', validateMiddleware(EventFormDto), eventController.update.bind(eventController));
eventRouter.delete('/:event_id', eventController.delete.bind(eventController));

export { eventRouter };