import { Injectable } from '@nestjs/common';
import { Span } from '@mhy/telemetry/tracing'

@Injectable()
export class CharacterService {
  @Span()
  getCharacters(): string[] {
    return []
  }
}
