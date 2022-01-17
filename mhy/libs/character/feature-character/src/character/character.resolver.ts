import { Resolver, Query } from '@nestjs/graphql';
import { CharacterService } from './character.service';

@Resolver()
export class CharacterResolver {
  constructor(private readonly service: CharacterService) { }

  @Query(() => [String])
  characters(): string[] {
    return this.service.getCharacters()
  }
}
