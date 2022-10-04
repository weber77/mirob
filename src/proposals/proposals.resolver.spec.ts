import { Test, TestingModule } from '@nestjs/testing';
import { ProposalsResolver } from './proposals.resolver';
import { ProposalsService } from './proposals.service';

describe('ProposalsResolver', () => {
  let resolver: ProposalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProposalsResolver, ProposalsService],
    }).compile();

    resolver = module.get<ProposalsResolver>(ProposalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
