import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProposalsModule } from './proposals/proposals.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UUIDResolver } from 'graphql-scalars';
import { SharedModule } from './shared/shared.module';
import { CommentsModule } from './comments/comments.module';
import { ThreadsModule } from './threads/threads.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesModule } from './votes/votes.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port:+process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      cors: {
        origin: ['http://localhost:3001', process.env.FE_ORIGIN],
      },
      resolvers: {
        UUID: UUIDResolver,
      },
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    ProposalsModule,
    ProfilesModule,
    ThreadsModule,
    CommentsModule,
    CategoriesModule,
    SharedModule,
    AuthModule,
    VotesModule,
    BookmarksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
