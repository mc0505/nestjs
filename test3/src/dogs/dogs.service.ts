import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/dogs.dto';
import { DogEntity } from './entities/dogs.entity';

@Injectable()
export class DogsService {
    private dogs: DogEntity[] = [
        {id: Date.now(), name: "al", age: 2, color: "yellow", type: "a"},
        {id: Date.now() + 1, name: "be", age: 4, color: "brown", type: "b"},
        {id: Date.now() + 2, name: "del", age: 3, color: "black", type: "c"},
    ];

    findAll(name?: string): DogEntity[]{
        return this.dogs;
    };

    findByID(id: number): DogEntity{
        try{
            return this.dogs.find(dog => dog.id === id)
        }catch(err){
            throw err;
        }
    }

    addDog(createDogDto: CreateDogDto): DogEntity{
        const newDog = { id: Date.now(), ...createDogDto }
        this.dogs.push(newDog);
        return newDog;
    }
}
