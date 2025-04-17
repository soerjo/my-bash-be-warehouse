import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CompleteBankTransactionDto } from '../dto/complete-bank-transaction.dto';
import { CancelBankTransactionDto } from '../dto/cancle-bank-transaction-bank.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../../../common/interface/request-response.interface';

@Injectable()
export class BankService {
  private readonly logger = new Logger(BankService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  
  async completeBankTransaction(dto: CompleteBankTransactionDto, token: string) {
    this.logger.log('=======> completeBankTransaction');
    try {
      const response$ = this.httpService.patch<IResponse<any>>(
        this.configService.get<string>('BANK_SERVICE_URL') + '/transaction/complete',
        {
          ...dto,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response = await lastValueFrom(response$);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to cancle transaction warehouse', error.stack || error.message);
      throw new BadRequestException(error.response.data.message);
    }  
  }

  async cancleBankTransaction(dto: CancelBankTransactionDto, token: string) {
    this.logger.log('=======> cancleBankTransaction');
    try {
      const response$ = this.httpService.patch<IResponse<any>>(
        this.configService.get<string>('BANK_SERVICE_URL') + '/transaction/cancel',
        {
          ...dto,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response = await lastValueFrom(response$);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to cancle transaction warehouse', error.stack || error.message);
      throw new BadRequestException(error.response.data.message);
    }    }
}
