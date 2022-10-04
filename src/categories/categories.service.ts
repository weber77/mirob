import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedService } from 'src/shared/services/shared.service';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { ListCategoriesInput } from './dto/list-categories.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private readonly logger: Logger = new Logger(CategoriesService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly sharedService: SharedService,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    try {
      this.logger.log('adding new category');

      const category = await this.categoryRepository.save(createCategoryInput);

      return category;
    } catch (error) {
      this.sharedService.sendError(error, this.create.name);
    }
  }

  async findAll(listCategoriesInput: ListCategoriesInput) {
    try {
      this.logger.log(`fetching categories`);

      const categories = await this.categoryRepository.find({
        skip: listCategoriesInput.pageNum * listCategoriesInput.pageSize,
        take: listCategoriesInput.pageSize,
        order: {
          updatedAt: 'ASC',
        },
      });

      if (categories.length == 0) throw new NotFoundException();

      return { total: categories.length, categories };
    } catch (error) {
      this.sharedService.sendError(error, this.findAll.name);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`fetching a category with id ${id}`);

      const category = await this.categoryRepository.findOneBy({ id });

      if (category === null) throw new NotFoundException();

      return category;
    } catch (error) {
      this.sharedService.sendError(error, this.findOne.name);
    }
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    try {
      this.logger.log(`updating a category with id ${id}`);

      const upadtedCategory = await this.categoryRepository
        .createQueryBuilder()
        .update(updateCategoryInput)
        .where({ id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);

      if (upadtedCategory === null) throw new NotFoundException();

      return upadtedCategory;
    } catch (error) {
      this.sharedService.sendError(error, this.update.name);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`deleting a category with id ${id}`);

      const removedCategory = await this.categoryRepository.delete(id);

      if (removedCategory === null) throw new NotFoundException();

      return removedCategory;
    } catch (error) {
      this.sharedService.sendError(error, this.remove.name);
    }
  }
}
