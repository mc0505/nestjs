import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User, userLogin } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('Auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ){}

    @ApiCreatedResponse({ type: User })
    @ApiBadRequestResponse()
    @Post('sign-up')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @ApiCreatedResponse({ type: userLogin })
    @ApiBadRequestResponse()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() login: userLogin, @Request() req){
        const token = await this.authService.getJwtToken(req.user);
        return token;
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBadRequestResponse()
    @Get('protected')
    getId(@Request() req){
        return req.user.id;
    }
}
