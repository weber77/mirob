import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PipelineStage } from 'mongoose';
import { SharedService } from 'src/shared/services/shared.service';
import { Like, Repository } from 'typeorm';
import { CreateProposalInput } from './dto/create-proposal.input';
import { ListProposalsInput } from './dto/list-proposals.input';
import { UpdateProposalInput } from './dto/update-proposal.input';
import { UpdateProposalStatusInput } from './dto/update-proposal-status.input';
import { Proposal } from './entities/proposal.entity';

@Injectable()
export class ProposalsService {
  private readonly logger: Logger = new Logger(ProposalsService.name);
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
    private readonly sharedService: SharedService,
  ) {}

  async create(createProposalInput: CreateProposalInput) {
    try {
      this.logger.log('adding new proposal');

      const proposal = await this.proposalRepository.save(createProposalInput);

      return proposal;
    } catch (error) {
      this.sharedService.sendError(error, this.create.name);
    }
  }

  async findAll(listProposalsInput: ListProposalsInput) {
    try {
      this.logger.log(`fetching proposals`);

      const proposals = await this.proposalRepository.find({
        relations: {
          profile: true,
          categories: true,
        },
        where: {
          status: listProposalsInput.status,
          title: Like(`%${listProposalsInput.search}`),
        },
        skip: listProposalsInput.pageNum * listProposalsInput.pageSize,
        take: listProposalsInput.pageSize,
        order: { updatedAt: 'ASC' },
      });

      if (proposals.length == 0) throw new NotFoundException();

      return { total: proposals.length, proposals: proposals };
    } catch (error) {
      this.sharedService.sendError(error, this.findAll.name);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`fetching a proposal with id ${id}`);

      const proposal = await this.proposalRepository.findOneBy({ id });

      if (proposal === null) throw new NotFoundException();

      return proposal;
    } catch (error) {
      this.sharedService.sendError(error, this.findOne.name);
    }
  }

  async update(id: string, updateProposalInput: UpdateProposalInput) {
    try {
      this.logger.log(`updating a proposal with id ${id}`);

      const updatedProposal = await this.proposalRepository
        .createQueryBuilder()
        .relation('proposal.categories', 'categories')
        .update(updateProposalInput)
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedProposal === null) throw new NotFoundException();

      return updatedProposal;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async updateStatus(
    id: string,
    updateProposalStatusInput: UpdateProposalStatusInput,
  ) {
    try {
      this.logger.log(`updating a proposal status with id ${id}`);

      const updatedProposal = await this.proposalRepository
        .createQueryBuilder()
        .update(updateProposalStatusInput)
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedProposal === null) throw new NotFoundException();

      return updatedProposal;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`deleting a proposal with id ${id}`);

      const removedProposal = await this.proposalRepository.delete(id);

      if (removedProposal === null) throw new NotFoundException();

      return removedProposal;
    } catch (error) {
      this.sharedService.sendError(error, this.remove.name);
    }
  }

  async incrementViews(id: string) {
    try {
      this.logger.log(`increasing a proposal views with id ${id}`);

      const updatedProposal = await this.proposalRepository
        .createQueryBuilder()
        .update({ views: 1 })
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (updatedProposal === null) throw new NotFoundException();

      return updatedProposal;
    } catch (error) {
      this.sharedService.sendError(error, this.incrementViews.name);
    }
  }
}
