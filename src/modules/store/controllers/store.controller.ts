import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StoreService } from '../services/store.service';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { FindStoreDto } from '../dto/find-store.dto';

@ApiTags('store')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@CurrentUser() userPayload: IJwtPayload, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto, userPayload);
  }

  @Get()
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindStoreDto) {
    return this.storeService.findAll(dto, userPayload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto, userPayload);
  }

  @Delete(':id')
  remove(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string) {
    return this.storeService.remove(+id, userPayload);
  }
}
