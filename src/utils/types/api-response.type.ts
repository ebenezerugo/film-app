import { ApiPropertyOptional } from '@nestjs/swagger';

export class TApiResponse<T> {
  @ApiPropertyOptional()
  data?: T;
  @ApiPropertyOptional()
  message: string;
  @ApiPropertyOptional()
  status?: boolean;

  constructor(message: string, status = true, data?: T) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  static success(data?: any, message = 'success'): TApiResponse<any> {
    return new TApiResponse(message, true, data);
  }

  static error(message: string): TApiResponse<any> {
    return new TApiResponse(message, false);
  }
}
