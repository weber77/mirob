import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { SharedModule } from 'src/shared/shared.module';
import { Profile } from './entities/profile.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksModule } from 'src/bookmarks/bookmarks.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Profile]),
    SharedModule,
    BookmarksModule,
  ],
  providers: [ProfilesResolver, ProfilesService, JwtService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
