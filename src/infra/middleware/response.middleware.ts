import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AppResponse } from '../../common/interface/requests.interface';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Intercept the response and wrap it with your structure
    const originalSend = res.send;

    res.send = (
      body?: any,
      errorStatusCode?: number,
      errorMessage?: string,
    ): Response => {
      if (body) {
        const responseBody: AppResponse<any>['success']['response'] = body;

        const requestId = req.headers['x-request-id'] || '';

        const timestamp = new Date().toISOString();

        const requestInfo = {
          method: req.method,
        };

        const responsePayload: AppResponse<any> = {
          success: {
            response: responseBody,
            requestInfo,
            requestMetadata: {
              requestId,
              timestamp,
            },
          },
          error: {},
        };

        if (errorStatusCode !== undefined && errorMessage !== undefined) {
          responsePayload.error.statusCode = errorStatusCode;
          responsePayload.error.message = errorMessage;
        }

        originalSend.call(res, responsePayload);
      }

      return res;
    };

    next();
  }
}
