import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
  ) {}
  
  getAll(): Promise<User[]>{
    return this.userRespository.find({
      relations: ['pets']
    });
  }

  async getOneByID(id: number): Promise <User>{
    try{
      const user = await this.userRespository.findOneOrFail(id);
      return user;
    }catch(err){
      throw err;
    }
  } 

  createUser (name: string): Promise<User>{
    const newUser = this.userRespository.create({name});

    return this.userRespository.save(newUser);
  }

  async updateUser(id: number, name:string): Promise<User>{
    const user = await this.getOneByID(id);
    user.name = name;

    return this.userRespository.save(user);
  }

  async delUser(id: number): Promise<User>{
    const user = await this.getOneByID(id);
    if(!user){
      throw new NotFoundException;
    }
    return this.userRespository.remove(user);
  }

  // customQuery(): any{
  //   return this.userRespository.createQueryBuilder("user").select("name").(where/orderby/groupby/...)
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
