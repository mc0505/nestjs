import { Module } from '@nestjs/common';
import { PetModule } from './pet/pet.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Pet } from './pet/pet.entity';
import { ContactInfo } from './contact-info/contact.entity';

@Module({
  imports: [
    AuthModule,
    PetModule, 
    UserModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Pet, ContactInfo])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
