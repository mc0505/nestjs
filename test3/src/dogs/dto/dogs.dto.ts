import { ApiProperty } from "@nestjs/swagger";

export class CreateDogDto{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    color: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    type: string;
}