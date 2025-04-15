import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { UnitsModule } from '../units/units.module';

@Module({
  imports: [UnitsModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
