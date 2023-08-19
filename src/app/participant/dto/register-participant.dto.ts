import { Participant } from '../../../common/interface/person.interface';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterParticipantDto implements Omit<Participant, '_id'> {
    @ApiProperty( { description: '' } )
    city: string;

    @ApiProperty( { description: '' } )
    email: string;

    @ApiProperty( { description: '' } )
    nome: string;

    @ApiProperty( { description: '' } )
    phone: string;

    @ApiProperty( { description: '' } )
    scholarship: string;

    @ApiProperty( { description: '' } )
    state: string;

    @ApiProperty( { description: '' } )
    university: string;

    participant(): Omit<Participant, '_id'>{
        return null
    }
}