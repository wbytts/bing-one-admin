import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomValidationException extends HttpException {
  constructor(message) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
