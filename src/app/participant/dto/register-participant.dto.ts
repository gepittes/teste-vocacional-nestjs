import { Participant } from '../../../common/interface/person.interface';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterParticipantDto implements Omit<Participant, '_id'> {
  @ApiProperty({ description: '' })
  email: string;

  @ApiProperty({ description: '' })
  name: string;

  @ApiProperty({ description: '' })
  phone: string;
}
