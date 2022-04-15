import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise <any> {
    await this.appService.seed();
    return "seed complete";
    // return this.appService.getEmployeeByI(1);
    // return this.appService.delEmployeeByID(2);
  }
}
