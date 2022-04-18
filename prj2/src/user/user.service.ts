import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfo } from 'src/contact-info/contact.entity';
import {  Repository } from 'typeorm';
import { Pet } from '../pet/pet.entity';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Pet) private petRepo: Repository<Pet>,
        @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
    ){}

    async getMaxUserID(){
        const id =  await this.userRepo.query(`select id from db.user order by id desc limit 1`);
        if(id.length == 0){
            return 0;
        }
        return id[0].id;
    }

    async getMaxContactID(){
        const id =  await this.userRepo.query(`select id from db.contact_info order by id desc limit 1`);
        if(id.length == 0){
            return 0;
        }
        return id[0].id;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        let id = await this.getMaxUserID();
        id ++;

        const newUser = {id, ...createUserDto}
        await this.userRepo.save(newUser);

        return this.userRepo.findOne(id);
    }

    async checkUserContactInfo(userId: number): Promise<ContactInfo>{
        const query = this.contactInfoRepo
        .createQueryBuilder('contact_info')
        .select(['*']).where("contact_info.userId = :userId", {userId})
        let userContact = await query.getRawOne();
        return userContact;
    }

    async checkUserPet(userId: number): Promise<Pet>{
        const query = this.petRepo
        .createQueryBuilder('pet')
        .select(['*']).where("pet.ownerId = :userId", {userId})
        let userPet = await query.getRawOne();
        return userPet;
    }

    async createContactInfo(contactInfo, userId: number): Promise<any>{
        let id = await this.getMaxContactID();
        id++;
        const contact = await this.checkUserContactInfo(userId) || undefined;
        if(contact !== undefined)
            return {mesg: "You have had contact info already"};
        const newContactInfo = {id, ...contactInfo, userId}
        await this.contactInfoRepo.save(newContactInfo);
        return contactInfo;
    }

    async deleteUser(id: number){
        await this.userRepo.delete(id);
        return await this.userRepo.find();
    }

    async findUser(username: string){
        const query =  this.userRepo
        .createQueryBuilder('user')
        .select(['*'])
        .where("user.username = :username", {username});
        let user = await query.getRawOne();
        return user;    
    }

    async adoptPet(petId, userId): Promise<any>{
        const user = await this.userRepo.findOne(userId);
        console.log(petId)
        const pet = await this.petRepo.findOne(petId);
        const contact = await this.checkUserContactInfo(userId) || undefined;
        if(contact !== undefined){
            user.pets=[pet];
            await this.userRepo.save(user)
            pet.ownerId = userId;
            await this.petRepo.save(pet)
            return user;
        }
        return false;
    }
}

