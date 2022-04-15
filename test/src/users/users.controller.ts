import { Body, Controller, Get, HttpException, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userEntity } from './entities/user.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor( private usersService: UsersService){}
    
    @ApiOkResponse({ type: userEntity, isArray: true })
    @ApiQuery({ name: 'name', required: false})
    @Get()
    getUsers(@Query('name') name?: string): userEntity[]{
        return this.usersService.findAll(name);
    }

    @ApiOkResponse({ type: userEntity, description: "user's id" })
    @ApiNotFoundResponse()
    @Get(':id')
    getUsersByID(@Param('id') id: number): userEntity{
        // console.log('--->', typeof(id));
        const user = this.usersService.findByID(id);
        if(!user){
            // throw new HttpException("Not found", 404);
            throw new NotFoundException();
        }
        return user;
    }

    @ApiCreatedResponse({ type: userEntity })
    @ApiBadRequestResponse()
    @Post()
    createUsers(@Body() body: CreateUserDto ): userEntity{
        return this.usersService.createUser(body);
    }
}