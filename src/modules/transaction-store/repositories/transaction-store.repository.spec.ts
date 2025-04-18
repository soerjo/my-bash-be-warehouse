import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionStoreRepository } from './transaction-store.repository';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Sample memory DB config
const testDataSource = new DataSource({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [__dirname + '/../../../modules/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrationsTableName: 'migrations-warehouse-service',
    schema: 'public'
});

describe('TransactionStoreRepository (Integration)', () => {
  let repository: TransactionStoreRepository;

  beforeAll(async () => {
    console.log({dir: __dirname + '/../../../../dist/modules/**/*.entity.js'})
    await testDataSource.initialize();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionStoreRepository,
        {
          provide: DataSource,
          useValue: testDataSource,
        },
      ],
    }).compile();

    repository = moduleRef.get<TransactionStoreRepository>(TransactionStoreRepository);
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it('should return results', async () => {
    // const dto: FindTransactionStoreDto = {
    //   page: 1,
    //   take: 10,
    // };

    const result = await repository.getTotalByStore({});
    expect(result).toBeDefined();
    console.dir(result, { depth: 5 });
  });

//   it('should return paginated transaction store results', async () => {
//     const dto: FindTransactionStoreDto = {
//       page: 1,
//       take: 10,
//     };

//     const result = await repository.findAll(dto);
//     expect(result).toBeDefined();
//     console.dir(result, { depth: 5 });
//   });

});
