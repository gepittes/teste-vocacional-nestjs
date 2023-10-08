import { Session } from '../interfaces/session.interface';
import { ApiProperty } from '@nestjs/swagger';

export class FinishSessionDto implements Pick<Session, 'sessionHash'> {
  @ApiProperty({ description: '' })
  sessionHash: Session['sessionHash'];
}
