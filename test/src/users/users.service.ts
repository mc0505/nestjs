import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

    private users: UserEntity[] = [
        {id: 0, name: "Mchi"}
        ,{id: 1, name: "Mchi"}
        ,{id: 3, name: "tao"}
    ];
    findAll(name?: string): UserEntity[]{
        if(name){
            return this.users.filter(user => user.name === name);
        }
        return this.users;
    }

    findByID(userID: number): UserEntity{
        return this.users.find(user => user.id === userID);
    }

    createUser(CreateUserDto: CreateUserDto): UserEntity{
        const newUser = {id: Date.now(), ...CreateUserDto};

        this.users.push(newUser);
        return newUser;
    }
}