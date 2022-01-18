import { Resolver, Query } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Observable } from 'rxjs'

@Resolver()
export class CharacterResolver {
  constructor(private readonly service: CharacterService) { }

  @Query(() => [String])
  characters(): Observable<string[]> {
    return this.service.getCharacters()
  }
}
