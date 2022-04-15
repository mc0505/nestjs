import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class ContactInfo{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({nullable: true})
    @ApiProperty()
    phoneNumber: number;

    @Column({nullable: true})
    @ApiProperty()
    phoneNumber2: number;

    @Column({nullable: true})
    @ApiProperty()
    email: string

    @Column()
    @ApiProperty()
    userId: number;

    @OneToOne(() => User, user => user.contactInfo, {onDelete: "CASCADE"})
    @JoinColumn()
    user: User;
}

