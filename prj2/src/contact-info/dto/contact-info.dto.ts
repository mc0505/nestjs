import { ApiProperty } from "@nestjs/swagger";

export class creContactInfo{
    @ApiProperty({required: false})
    phoneNumber: number;
    
    @ApiProperty({required: false})
    phoneNumber2: number;
    
    @ApiProperty({required: false})
    email: string
}