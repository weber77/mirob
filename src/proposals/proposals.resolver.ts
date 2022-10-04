import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProposalsService } from './proposals.service';
import { CreateProposalInput } from './dto/create-proposal.input';
import { UpdateProposalInput } from './dto/update-proposal.input';
import { ListProposalsInput } from './dto/list-proposals.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserGuard } from 'src/auth/user.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ProfileRole } from 'src/profiles/entities/profile.entity';
import { UpdateProposalStatusInput } from './dto/update-proposal-status.input';

@Resolver('Proposal')
export class ProposalsResolver {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Mutation('createProposal')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async create(
    @Args('createProposalInput') createProposalInput: CreateProposalInput,
  ) {
    return await this.proposalsService.create(createProposalInput);
  }

  @Query('proposals')
  async findAll(@Args() listProposalsInput: ListProposalsInput) {
    return await this.proposalsService.findAll(listProposalsInput);
  }

  @Query('proposal')
  async findOne(@Args('id') id: string) {
    return await this.proposalsService.findOne(id);
  }

  @Mutation('updateProposal')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async update(
    @Args('updateProposalInput') updateProposalInput: UpdateProposalInput,
  ) {
    return await this.proposalsService.update(
      updateProposalInput.id,
      updateProposalInput,
    );
  }

  @Mutation('updateProposalStatus')
  @Roles(ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateSta(
    @Args('updateProposalStatusInput')
    updateProposalStatusInput: UpdateProposalStatusInput,
  ) {
    return await this.proposalsService.updateStatus(
      updateProposalStatusInput.id,
      updateProposalStatusInput,
    );
  }

  @Mutation('removeProposal')
  @Roles(ProfileRole.AUTHOR, ProfileRole.SHARIAH, ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserGuard)
  async remove(@Args('id') id: string) {
    return await this.proposalsService.remove(id);
  }

  @Mutation('incrementProposalViews')
  @UseGuards(JwtAuthGuard)
  async incrementViews(@Args('id') id: string) {
    return await this.proposalsService.incrementViews(id);
  }
}
