import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from './dto/current.auth';

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async validateUser(username:string, password: string): Promise<any>{
        const user = await this.userService.findUser(username);
        if(user && user.password === password){
            let currentUser = new CurrentUser();
            currentUser.id = user.id;
            currentUser.name = user.name;
            
            return currentUser;
        }
        return null; 
    }

    async login(user: any){
        const payload = {username: user.name, id: user.id}
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async getJwtToken(user:CurrentUser): Promise<string>{
        const payload = {
            ...user
        }
        return await this.jwtService.signAsync(payload);
    }
}
