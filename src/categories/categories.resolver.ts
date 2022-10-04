import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProfileRole } from 'src/profiles/entities/profile.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { ListCategoriesInput } from './dto/list-categories.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation('createCategory')
  @Roles(ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoriesService.create(createCategoryInput);
  }

  @Query('categories')
  async findAll(@Args() listCategoriesInput: ListCategoriesInput) {
    return await this.categoriesService.findAll(listCategoriesInput);
  }

  @Query('category')
  async findOne(@Args('id') id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Mutation('updateCategory')
  @Roles(ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return await this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation('removeCategory')
  @Roles(ProfileRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Args('id') id: string) {
    return await this.categoriesService.remove(id);
  }
}
