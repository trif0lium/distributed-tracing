import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLGatewayModule.forRoot({
      server: {
        plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground()
        ]
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: "character",
              url: "http://localhost:5001/graphql"
            }
          ]
        }),
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
