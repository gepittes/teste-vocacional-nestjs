import { AppResponse } from '../../common/interface/requests.interface';
import e, { Request, Response } from 'express';

export class ResponseUtils {
  static successResponse<T>(
    req: Request,
    res: Response,
    body: T,
  ): Response<any, Record<string, any>> {
    const timestamp: string = new Date().toISOString();

    const requestId: string = (req.headers['x-request-id'] as string) || '';

    const response: AppResponse<T> = {
      success: {
        response: body,
        requestInfo: {},
        requestMetadata: {
          requestId,
          timestamp,
        },
      },
      error: {},
    };

    return res.send(response);
  }

  static errorResponse<T>(
    res: Response,
    statusCode: number,
    messageError: string,
  ): Response<any, Record<string, any>> {
    const response: AppResponse<T> = {
      success: undefined,
      error: {
        statusCode,
        message: messageError,
      },
    };

    return res.status(statusCode).send(response);
  }
}
