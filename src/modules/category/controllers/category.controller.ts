import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { FindCategoryDto } from '../dto/find-category.dto';
import { FindBulkDto } from '../dto/get-bulk-category.dto';

@ApiTags('category')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@CurrentUser() userPayload: IJwtPayload, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto, userPayload);
  }

  @Get()
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindCategoryDto) {
    return this.categoryService.findAll(dto, userPayload);
  }

  @Get('bulk')
  getBulks(@Query() dto: FindBulkDto) {
    return this.categoryService.getBulkByIds(dto.ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto, userPayload);
  }

  // @Delete(':id')
  // remove(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string) {
  //   return this.categoryService.remove(+id, userPayload);
  // }
}
