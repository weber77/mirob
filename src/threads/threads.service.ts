import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model, PipelineStage } from 'mongoose';
import { Profile } from 'src/profiles/entities/profile.entity';
import { SharedService } from 'src/shared/services/shared.service';
import { Like, Repository } from 'typeorm';
import { CreateThreadInput } from './dto/create-thread.input';
import { ListThreadsInput } from './dto/list-threads.input';
import { UpdateThreadStatusInput } from './dto/update-thread-status.input';
import { UpdateThreadInput } from './dto/update-thread.input';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadsService {
  private readonly logger: Logger = new Logger(ThreadsService.name);
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
    private readonly sharedService: SharedService,
  ) {}
  async create(createThreadInput: CreateThreadInput) {
    try {
      this.logger.log('adding new thread');

      const thread = await this.threadRepository.save(createThreadInput);

      return thread;
    } catch (error) {
      this.sharedService.sendError(error, this.create.name);
    }
  }

  async findAll(listThreadsInput: ListThreadsInput) {
    try {
      this.logger.log(`fetching threads`);

      const threads = await this.threadRepository.find({
        relations: { profile: true, categories: true },
        where: {
          status: listThreadsInput.status,
          title: Like(`%${listThreadsInput.search}`),
        },
        skip: listThreadsInput.pageNum * listThreadsInput.pageSize,
        take: listThreadsInput.pageSize,
        order: {
          updatedAt: 'ASC',
        },
      });

      if (threads.length === 0) throw new NotFoundException();

      return { total: threads.length, threads: threads };
    } catch (error) {
      this.sharedService.sendError(error, this.findAll.name);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`fetching a thread with id ${id}`);

      const thread = await this.threadRepository.findOneBy({ id });

      if (thread === null) throw new NotFoundException();

      return thread;
    } catch (error) {
      this.sharedService.sendError(error, this.findOne.name);
    }
  }

  async update(id: string, updateThreadInput: UpdateThreadInput) {
    try {
      this.logger.log(`updating a thread with id ${id}`);

      const updatedThread = await this.threadRepository
        .createQueryBuilder()
        .update(updateThreadInput)
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedThread === null) throw new NotFoundException();

      return updatedThread;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async updateStatus(
    id: string,
    updateThreadStatusInput: UpdateThreadStatusInput,
  ) {
    try {
      this.logger.log(`updating a thread status with id ${id}`);

      const updatedThread = await this.threadRepository
        .createQueryBuilder()
        .update(updateThreadStatusInput)
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedThread === null) throw new NotFoundException();

      return updatedThread;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`deleting a thread with id ${id}`);

      const removedThread = await this.threadRepository.delete(id);

      if (removedThread === null) throw new NotFoundException();

      return removedThread;
    } catch (error) {
      this.sharedService.sendError(error, this.remove.name);
    }
  }

  async incrementViews(id: string) {
    try {
      this.logger.log(`increment a thread views with id ${id}`);

      const updatedThread = await this.threadRepository
        .createQueryBuilder()
        .update({ views: 1 })
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedThread === null) throw new NotFoundException();

      return updatedThread;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }
}
