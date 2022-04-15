import { Controller, Get, Post, Body, Param, UseGuards, Request, Delete, NotFoundException, Inject, forwardRef} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
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
    @ApiBadRequestResponse()
    @ApiBearerAuth()
    @Get('protected')
    getId(@Request() req){
        const id = req.user.id;
        return id;
    }


    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: User})
    @ApiBadRequestResponse()
    @ApiBearerAuth()
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
    @ApiOkResponse({type: User})
    @ApiBadRequestResponse()
    @ApiBearerAuth()
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
    @ApiOkResponse({type: User, description: "user's id"})
    @ApiBearerAuth()
    @Delete('remove-user')
    removePet(@Request() req) {
        const id = this.getId(req);
        return this.userService.deleteUser(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: creContactInfo, description: "user's id"})
    @ApiBearerAuth()
    @Post('add-contact-info')
    async addContactInfo(@Body() addContactInfo: creContactInfo, @Request() req: number){
        const id = this.getId(req);
        return this.userService.createContactInfo(addContactInfo, id);
    }
}
