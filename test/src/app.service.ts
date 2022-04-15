import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
