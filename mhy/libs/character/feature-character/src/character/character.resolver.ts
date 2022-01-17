import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class CharacterResolver {
  @Query(() => [String])
  characters(): string[] {
    return []
  }
}
