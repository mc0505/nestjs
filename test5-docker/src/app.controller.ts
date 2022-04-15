import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Movie } from './user/entity/movie.entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(): Movie[] {
    return this.appService.getMovies();
  }
}
