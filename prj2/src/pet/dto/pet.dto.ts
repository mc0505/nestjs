import { ApiProperty } from "@nestjs/swagger";

export class CreatePetDto{
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