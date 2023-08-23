import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilters implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'P2025') {
      return response.status(404).json({
        statusCode: 404,
        messsage: exception.message,
      });
    }

    return response.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
