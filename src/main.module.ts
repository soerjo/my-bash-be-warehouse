import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import appConfig from './config/app.config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { HttpExceptionFilter } from './common/interceptor/http-exception.interceptor';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { CategoryModule } from './modules/category/category.module';
import { UnitsModule } from './modules/units/units.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { StoreModule } from './modules/store/store.module';
import { TransactionWarehouseModule } from './modules/transaction-warehouse/transaction-warehouse.module';
import { TransactionStoreModule } from './modules/transaction-store/transaction-store.module';
import { FeeModule } from './modules/fee/fee.module';
import { BankModule } from './modules/bank/bank.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    JwtModule.register({
      global: true,
    }),
    WarehouseModule,
    CategoryModule,
    UnitsModule,
    StoreModule,
    TransactionWarehouseModule,
    TransactionStoreModule,
    FeeModule,
    BankModule,
    // other module...
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
