import { SuccessResponse } from "../../common/http/responses/success.response";
import { BookingService } from "../../core/services/booking/booking.service";
import { Response, Request, NextFunction } from "express";

export class BookingController {
    constructor(private bookingService: BookingService) { }

    async findMany(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.bookingService.findMany();

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
            const param = Number(req.params?.booking_id);
            const result = await this.bookingService.findUnique({ id: param });

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
            const body = req.body;
            const result = await this.bookingService.create(body);

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
            const body = req.body;
            const param = Number(req.params?.booking_id);
            const result = await this.bookingService.update(param, body);

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
            const param = Number(req.params?.booking_id);
            const result = await this.bookingService.delete(param);

            res.status(200).json(SuccessResponse({
                statusCode: 200,
                data: result
            }))
        } catch (error: any) {
            next(error);
        }
    }
}