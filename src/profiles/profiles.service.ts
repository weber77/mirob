import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SharedService } from 'src/shared/services/shared.service';
import { BookmarkCommentInput } from './dto/bookmark-comment-input';
import { LoginProfileInput } from './dto/login-profile.input';
import { ListProfilesInput } from './dto/list-profiles.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UpdateProfileRoleInput } from './dto/update-profile-role.input';
import { Bookmark } from 'src/bookmarks/entities/bookmark.entity';

@Injectable()
export class ProfilesService {
  private readonly logger: Logger = new Logger(ProfilesService.name);
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly sharedService: SharedService,
    private jwtService: JwtService,
  ) {}

  async login(loginProfileInput: LoginProfileInput) {
    try {
      this.logger.log(
        `login a profile with address ${loginProfileInput.walletAddress}`,
      );

      const profile = await this.findOne(loginProfileInput.walletAddress);

      const msg =
        'Welcome to MIRO!\n\nClick to sign in and accept the MIRO Terms of Service: https://mrhb.network\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 1 hour.\n\nWallet address:\n' +
        loginProfileInput.walletAddress +
        '\n\nNonce:\n' +
        profile.nonce;

      const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
      let address;
      try {
        address = recoverPersonalSignature({
          data: msgBufferHex,
          signature: loginProfileInput.signature,
        });
      } catch (e) {
        throw new HttpException(e, HttpStatus.UNAUTHORIZED);
      }

      if (
        loginProfileInput.walletAddress.toLowerCase() == address.toLowerCase()
      ) {
        await this.update(profile.id, { id: profile.id, nonce: uuid() });

        return {
          jwtToken: this.jwtService.sign(
            {
              id: profile.id,
              walletAddress: loginProfileInput.walletAddress,
              role: profile.role,
            },
            { secret: process.env.JWT_SECRET, expiresIn: '1h' },
          ),
        };
      } else {
        throw new HttpException(
          "address and signature didn't match",
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      this.sharedService.sendError(error, this.login.name);
    }
  }

  async findAll(listProfilesInput: ListProfilesInput) {
    try {
      this.logger.log(`fetching proposals`);

      const profiles = await this.profileRepository.find({
        where: { walletAddress: Like(`%${listProfilesInput.search}`) },
        skip: listProfilesInput.pageNum * listProfilesInput.pageSize,
        take: listProfilesInput.pageSize,
        order: { updatedAt: 'ASC' },
      });

      if (profiles.length == 0) throw new NotFoundException();

      return { total: profiles.length, profiles: profiles };
    } catch (error) {
      this.sharedService.sendError(error, this.findAll.name);
    }
  }

  async findOne(walletAddress: string) {
    try {
      this.logger.log(`fetching a profile with walletAddress ${walletAddress}`);

      let profile = await this.profileRepository.findOne({
        relations: {
          bookmarks: true,
        },
        where: { walletAddress },
      });

      profile = await this.profileRepository.save(
        Object.assign(profile ? profile : {}, {
          walletAddress,
        }),
      );

      return profile;
    } catch (error) {
      this.sharedService.sendError(error, this.findOne.name);
    }
  }

  async update(id: string, updateProfileInput: UpdateProfileInput) {
    try {
      this.logger.log(`updating a profile with id ${id}`);

      const updatedProfile = await this.profileRepository
        .createQueryBuilder()
        .update(updateProfileInput)
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedProfile === null) throw new NotFoundException();

      return updatedProfile;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async updateRole(id: string, updateProfileInput: UpdateProfileRoleInput) {
    try {
      this.logger.log(`updating a role for profile with id ${id}`);

      const updatedProfile = await this.profileRepository
        .createQueryBuilder()
        .update(updateProfileInput)
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedProfile === null) throw new NotFoundException();

      return updatedProfile;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`deleting a profile with id ${id}`);

      const removedProfile = await this.profileRepository.delete(id);

      if (removedProfile === null) throw new NotFoundException();

      return removedProfile;
    } catch (error) {
      this.sharedService.sendError(error, this.remove.name);
    }
  }

  async bookmark(bookmarkCommentInput: BookmarkCommentInput) {
    try {
      this.logger.log(
        `bookmarking a comment with id ${bookmarkCommentInput.comment}`,
      );

      const bookmark = await this.bookmarkRepository.findOneBy({
        profileId: bookmarkCommentInput.id,
        commentId: bookmarkCommentInput.comment,
      });

      await this.bookmarkRepository.save(
        Object.assign(bookmark ? bookmark : {}, {
          profileId: bookmarkCommentInput.id,
          commentId: bookmarkCommentInput.comment,
        }),
      );

      const updatedProfile = await this.profileRepository.findOneBy({
        id: bookmarkCommentInput.id,
      });

      if (updatedProfile === null) throw new NotFoundException();

      return updatedProfile;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async unbookmark(bookmarkCommentInput: BookmarkCommentInput) {
    try {
      this.logger.log(
        `unBookmarking a comment with id ${bookmarkCommentInput.comment}`,
      );

      const bookmark = await this.bookmarkRepository.findOneBy({
        profileId: bookmarkCommentInput.id,
        commentId: bookmarkCommentInput.comment,
      });

      if (bookmark) {
        await this.bookmarkRepository.delete(bookmark.id);
      }

      const updatedProfile = await this.profileRepository.findOneBy({
        id: bookmarkCommentInput.id,
      });

      return updatedProfile;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }
}
