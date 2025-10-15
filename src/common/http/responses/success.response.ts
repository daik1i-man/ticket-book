import { ISuccessReponse } from "../../../types/success-reponse.type";

export const SuccessResponse = (params: ISuccessReponse) => {
    return {
        success: true,
        statusCode: params.statusCode,
        message: 'Operation successfully',
        timestamp: Math.floor(Date.now() / 100),
        data: params.data && params.data
    }
}