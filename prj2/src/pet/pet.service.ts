import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/pet.dto';
import { Pet, UpdatePet } from './pet.entity';

@Injectable()
export class PetService {
    constructor(
        @InjectRepository(Pet) private petRepo: Repository<Pet>,
    ){}

    async getMaxPetID(){
        const id = await this.petRepo.query(`select id from db.pet order by id desc limit 1`);
        if(id.length == 0){
            return 0;
        }
        return id[0].id;
    }
    
    async createPet(createPetDto: CreatePetDto): Promise<Pet>{
        let id = await this.getMaxPetID();
        id++;
        const newPet = {id, ...createPetDto};
        await this.petRepo.save(newPet);

        return this.petRepo.findOne(id);
    }

    async findAllPets(): Promise<Pet[]> {
        return await this.petRepo.find();
    }
    
    async findOnePet(id: number): Promise<Pet> {
        return await this.petRepo.findOne(id);
    }

    async updatePet(updatePetDto: UpdatePet, petId): Promise<any> {
        return await this.petRepo.update(petId, updatePetDto);
    }
    
    async removePet(id: number): Promise<Pet[]> {
        await this.petRepo.delete(id);
        return await this.petRepo.find();
    }
}
