import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
const readFileSync = require('fs').readFileSync;
import { catchError, map } from 'rxjs/operators';
import { WeatherResponseInterface } from './models/api';
import {
  ApiResponseInterface,
  City,
  CityCoordinates,
  WeatherInfoInterface,
} from './models/application';

const genericErrorMessage = 'Something went wrong. Please try again later.';

@Injectable()
export class AppService {
  cityData: City[];
  constructor(private httpService: HttpService) {}

  // Load City Data
  loadCityData() {
    const file = readFileSync('./src/data/cities_20000.csv', 'utf8');
    this.parseCityData(file);
  }

  // Parse City Data
  parseCityData(file: string) {
    const lines = file.split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map((line: string) => {
      const obj = {};
      const values = line.split(',');
      headers.forEach((header, i) => {
        if (header === 'lon' || header === 'lat') {
          obj[header] = parseFloat(values[i]);
        } else {
          obj[header] = values[i];
        }
      });
      return obj;
    });
    this.cityData = data as City[];
  }

  // Get Search City Results
  getSearchCityResults(query: string): ApiResponseInterface<City[]> {
    try {
      const results = this.cityData.filter((city) => {
        return (
          city?.city_name?.toLowerCase().indexOf(query.toLowerCase()) === 0
        );
      });
      return { data: results, errorMessage: null };
    } catch (e) {
      return { data: null, errorMessage: genericErrorMessage };
    }
  }

  // Get Current City Weather Info
  async getCurrentCityWeatherInfo({ lat, lon }: CityCoordinates) {
    return this.httpService
      .get<WeatherResponseInterface>(
        `${process.env.WEATHER_API_URL}?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${process.env.WEATHER_API_KEY}`,
      )
      .pipe(
        map((response) => {
          return {
            data: this.extractWeatherData(response.data),
            error: null,
          };
        }),
        catchError((e) => {
          return of({
            data: null,
            errorMessage: genericErrorMessage,
          });
        }),
      );
  }

  // Extract Weather Data 
  extractWeatherData(
    weatherData: WeatherResponseInterface,
  ): WeatherInfoInterface {
    const hourlyData = weatherData.hourly.slice(0, 24).map((hour) => {
      return {
        dt: hour.dt + weatherData.timezone_offset,
        temp: hour.temp,
        humidity: hour.humidity,
        weather: { icon: hour.weather[0].icon },
      };
    });

    const dailyData = weatherData.daily.slice(1, 6).map((day) => {
      return {
        dt: day.dt,
        temp: { max: day.temp.max, min: day.temp.min },
        weather: {
          icon: day.weather[0].icon,
          description: day.weather[0].description,
        },
      };
    });
    return {
      hourly: hourlyData,
      daily: dailyData,
    };
  }
 
  // Pre Defined Cities Data
  preDefinedCitiesData(): ApiResponseInterface<City[]> {
    try {
      const cities = ['Rio de Janeiro', 'Beijing', 'Los Angeles'];
      const data = cities.map((city) => {
        return this.cityData.find((c) => c.city_name === city);
      });
      return { data, errorMessage: null };
    } catch (e) {
      return { data: null, errorMessage: genericErrorMessage };
    }
  }
}
