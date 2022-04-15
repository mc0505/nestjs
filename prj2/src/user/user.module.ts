import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Pet } from 'src/pet/pet.entity';
import { ContactInfo } from 'src/contact-info/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, ContactInfo])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
