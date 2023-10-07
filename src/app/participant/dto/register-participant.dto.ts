import { Participant } from '../../../common/interface/person.interface';
import { ApiProperty } from '@nestjs/swagger';
import { dataProcessing } from '../../../common/utils/object.utils';

export class RegisterParticipantDto implements Omit<Participant, '_id'> {
  @ApiProperty({ description: '' })
  email: string;

  @ApiProperty({ description: '' })
  name: string;

  @ApiProperty({ description: '' })
  phone: string;

  participant(): Omit<Participant, '_id'> {
    return dataProcessing(this);
  }
}
