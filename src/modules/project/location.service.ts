import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Location } from './dto/project-response.dto';
import { BrasilAPICEPResponse } from './types/brasilApiCep.response';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(private readonly httpService: HttpService) {}

  public async findByZipCode(zipCode: string): Promise<Location> {
    const {
      data: { city, state },
    } = await firstValueFrom(
      this.httpService
        .get<BrasilAPICEPResponse>(
          `https://brasilapi.com.br/api/cep/v1/${zipCode}`,
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data);
            throw new HttpException(
              'An error occurred while trying to get location data',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
    );

    return {
      city,
      state,
    };
  }
}
