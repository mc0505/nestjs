import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Pet{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    age: number;

    @Column()
    @ApiProperty()
    type: string;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    img_src: string;

    @Column({nullable: true})
    @ApiProperty()
    ownerId: number;

    @ManyToOne(() => User, owner => owner.pets, {onDelete: "SET NULL"})
    owner: User;
}

export class UpdatePet{
    @ApiProperty()
    age: number;

    @ApiProperty()
    type: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    img_src: string;
}

export class AdoptPet{
    @ApiProperty()
    id: number;
}