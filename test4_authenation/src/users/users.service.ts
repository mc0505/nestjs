import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: 'mchi',
            username: 'alo',
            password: '123',
        },
        {
            id: 1,
            name: 'mchi1',
            username: 'ola',
            password: '456',
        }
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }


    
}
