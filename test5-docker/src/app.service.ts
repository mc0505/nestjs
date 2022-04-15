import { Injectable } from '@nestjs/common';
import { Movie } from './user/entity/movie.entities';

@Injectable()
export class AppService {
  private movies: Movie[] = [
    {id: 1, name: "a", year: 2015},
    {id: 2, name: "b", year: 2017},
    {id: 3, name: "c", year: 2019},
    {id: 4, name: "d", year: 2021},
  ] 

  getMovies(): Movie[]{
    return this.movies;
  }
}
