import { Module } from '@nestjs/common';
import { BankService } from './services/bank.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule]
,  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
