import { createParamDecorator } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "../contact-info/contact.entity";
import { Pet } from "../pet/pet.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column()
    @ApiProperty()
    name: string;

    @OneToOne(() => ContactInfo, contactInfo => contactInfo.user)
    contactInfo: ContactInfo;

    @OneToMany(() => Pet, pet => pet.owner)
    pets: Pet[];
}

export class userLogin{
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}