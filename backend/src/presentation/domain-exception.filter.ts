import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { DomainException, InsufficientStockException } from '../domain/exceptions/domain.exceptions';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status = HttpStatus.BAD_REQUEST;
        if (exception instanceof InsufficientStockException) {
            status = HttpStatus.CONFLICT;
        }

        response.status(status).json({
            statusCode: status,
            message: exception.message,
            code: exception.code,
        });
    }
}
