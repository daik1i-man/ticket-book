import { SuccessResponse } from "../../common/http/responses/success.response";
import { UserService } from "../../core/services/user/user.service";
import { UserFormDto } from "../../types/dtos/user/user.dto";
import { Response, Request, NextFunction } from "express";

export class UserController {
    constructor(private userService: UserService) { }

    async findMany(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userService.findMany();

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
            const param = Number(req.params?.user_id);
            const result = await this.userService.findUnique({ id: param });

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
            const body: UserFormDto = req.body;
            const result = await this.userService.create(body);

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
            const body: UserFormDto = req.body;
            const param = Number(req.params?.user_id);
            const result = await this.userService.update({ id: param }, body);

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
            const param = Number(req.params?.user_id);
            const result = await this.userService.delete({ id: param });

            res.status(200).json(SuccessResponse({
                statusCode: 200,
                data: result
            }))
        } catch (error: any) {
            next(error);
        }
    }
}