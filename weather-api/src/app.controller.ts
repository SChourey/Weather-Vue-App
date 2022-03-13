import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CityCoordinates } from './models/application';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getSearchCityResults')
  getSearchCityResults(@Query() query: { query: string }) {
    return this.appService.getSearchCityResults(query.query);
  }

  @Get('getCurrentCityWeatherInfo')
  async getCurrentCityWeatherInfo(@Query() query: CityCoordinates) {
    return await this.appService.getCurrentCityWeatherInfo(query);
  }

  @Get('preDefinedCitiesData')
  preDefinedCitiesData() {
    return this.appService.preDefinedCitiesData();
  }
}
