import { Controller, Get, Post, Body, Param, UseGuards, Request, Delete, NotFoundException, Patch} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AdoptPet } from "src/pet/pet.entity";
import { creContactInfo} from "../contact-info/dto/contact-info.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('User')
@ApiTags('users')
export class UserController{
constructor(
        private readonly userService: UserService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBadRequestResponse()
    @Get('protected')
    getId(@Request() req){
        const id = req.user.id;
        return id;
    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: User})
    @ApiBadRequestResponse()
    @Get('check-user-profile')
    async checkUserContactInfo(@Request() req){
        const id = this.getId(req);
        const userContact = await this.userService.checkUserContactInfo(id);
        if(!userContact){
            throw new NotFoundException;
        }
        return userContact;
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: User})
    @ApiBadRequestResponse()
    @Get('check-user-profile')
    async checkUserPet(@Request() req){
        const id = this.getId(req);
        const userPet = await this.userService.checkUserPet(id);
        if(!userPet){
            return {mesg: "No pet yet!"};
        }
        return userPet;
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: User})
    @ApiBadRequestResponse()
    @Get('check-pet-profile')
    async checkUserPetInfo(@Request() req){
        const id = this.getId(req);
        const userPet = await this.userService.checkUserPet(id);
        if(!userPet){
            throw new NotFoundException;
        }
        return userPet;
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: User, description: "user's id"})
    @Delete('remove-user')
    async removeUser(@Request() req) {
        const id = this.getId(req);
        return await this.userService.deleteUser(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: creContactInfo, description: "user's id"})
    @Post('add-contact-info')
    async addContactInfo(@Body() addContactInfo: creContactInfo, @Request() req: number){
        const id = this.getId(req);
        return this.userService.createContactInfo(addContactInfo, id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: AdoptPet, description: "pet's id"})
    @Patch('adopt')
    async adoptPet(@Body() petId: AdoptPet, @Request() req){
        const id = this.getId(req);
        const result = await this.userService.adoptPet(Number(petId.id), id);
        if(result == 1){
            return 1;
        } else if (result == 2){
            return 2;
        }
        return result;
    }
}
