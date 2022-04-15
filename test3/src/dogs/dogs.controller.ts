import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/dogs.dto';
import { DogEntity } from './entities/dogs.entity';

@ApiTags('Dogs')
@Controller('dogs')
export class DogsController {
    constructor( private dogService: DogsService){}
    
    @ApiOkResponse({type: DogEntity, isArray: true})
    @ApiQuery({name: 'name', required: false})
    @Get()
    findAll(@Query('name') name?: string): DogEntity[]{
        return this.dogService.findAll(name);
        
    }

    @Get(':id')
    findDogByID(@Param('id', ParseIntPipe) id: number){
        const dog =  this.dogService.findByID(id);
        if(!dog){
            throw new NotFoundException;
        }
        return dog;
    }

    @Post()
    addNewDog(@Body() body: CreateDogDto): DogEntity{
        return this.dogService.addDog(body);
    }
}