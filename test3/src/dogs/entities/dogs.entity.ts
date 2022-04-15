import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";

export class DogEntity{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
    
    @ApiProperty()
    age: number;

    @ApiProperty()
    color: string;

    @ApiProperty()
    type: string;
}