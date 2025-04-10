import { Injectable } from '@nestjs/common';
import { FindTransactionStoreDto } from '../../../modules/transaction-store/dto/find-transaction-store.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { TransactionWarehouseRepository } from '../repositories/transaction-store.repository';

@Injectable()
export class TransactionWarehouseService {
  constructor(private readonly transactionWarehouseRepository: TransactionWarehouseRepository) {}
  
  findAll(dto: FindTransactionStoreDto, userPayload: IJwtPayload) {
    return this.transactionWarehouseRepository.findAll(dto, userPayload);
  }

  findOne(id: number) {
    return this.transactionWarehouseRepository.findOneBy({ id });
  }


}
