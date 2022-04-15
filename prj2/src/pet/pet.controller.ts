import { Request, Get, Post, Body, Param, Delete, Controller, NotFoundException, Patch, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiResponseProperty, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreatePetDto } from "./dto/pet.dto";
import { Pet, UpdatePet } from "./pet.entity";
import { PetService } from "./pet.service";

@Controller('Pet')
@ApiTags('pets')
export class PetController{
constructor(private readonly petService: PetService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('protected')
    getId(@Request() req){
        return req.user.id;
    }

    @ApiOkResponse({ type: Pet, isArray: true })
    @Get('find-all')
    findAllPets() {
        return this.petService.findAllPets();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: Pet, description: "pet's id"})
    @ApiNotFoundResponse()
    @Get(':id/find-pet')
    async findOnePet(@Param('id') id: number) {
        const pet = await this.petService.findOnePet(id);
        if(!pet)
            throw new NotFoundException
        return pet;
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: Pet })
    @ApiBadRequestResponse()
    @Post('add-pet')
    createPet(@Body() createPetDto: CreatePetDto) {
        return this.petService.createPet(createPetDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id/remove-pet')
    removePet(@Param('id') id: number) {
        return this.petService.removePet(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({type: UpdatePet})
    @Patch(':id/update-pet-profile')
    async updatePet(@Body() updatePet: UpdatePet, petId: number) {
        return await this.petService.updatePet(updatePet, petId);
    }
}