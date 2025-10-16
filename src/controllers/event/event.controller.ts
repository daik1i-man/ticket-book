import { SuccessResponse } from "../../common/http/responses/success.response";
import { EventService } from "../../core/services/event/event.service";
import { EventFormDto } from "../..//types/dtos/event/event.dto";
import { Response, Request, NextFunction } from "express";

export class EventController {
    constructor(private eventService: EventService) { }

    async findMany(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.eventService.findMany();

            res.status(200).json(SuccessResponse({
                statusCode: 200,
                data: result
            }))
        } catch (error: any) {
            next(error);
        }
    }

    async findUnique(req: Request, res: Response, next: NextFunction) {
        try {
            const param = Number(req.params?.event_id);
            const result = await this.eventService.findUnique({ id: param });

            res.status(200).json(SuccessResponse({
                statusCode: 200,
                data: result
            }))
        } catch (error: any) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: EventFormDto = req.body;
            const result = await this.eventService.create(body);

            res.status(201).json(SuccessResponse({
                statusCode: 201,
                data: result
            }))
        } catch (error: any) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const body: EventFormDto = req.body;
            const param = Number(req.params?.event_id);
            const result = await this.eventService.update({ id: param }, body);

            res.status(200).json(SuccessResponse({
                statusCode: 200,
                data: result
            }))
        } catch (error: any) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const param = Number(req.params?.event_id);
            const result = await this.eventService.delete({ id: param });

            res.status(200).json(SuccessResponse({
                statusCode: 200,
                data: result
            }))
        } catch (error: any) {
            next(error);
        }
    }
}