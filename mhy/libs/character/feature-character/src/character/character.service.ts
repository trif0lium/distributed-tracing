import { Injectable } from '@nestjs/common';
import { Span } from '@mhy/telemetry/tracing'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CharacterService {
  constructor(private readonly httpService: HttpService) {}
  @Span()
  getCharacters(): Observable<string[]> {
    return this.httpService.get<string[]>('https://api.genshin.dev/characters').pipe(map(({ data }) => data))
  }
}
