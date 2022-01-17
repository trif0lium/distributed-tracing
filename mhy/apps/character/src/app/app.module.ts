import { Module } from '@nestjs/common';
import { CharacterModule } from '@mhy/character/feature-character'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLFederationModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true
    }),
    CharacterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
