import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DiseaseService } from './disease/disease.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly diseaseService: DiseaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/gejala')
  async getAllSymptoms() {
    return await this.diseaseService.getAllSymptoms();
  }

  @Get('/penyakit')
  async getAllDisease() {
    return await this.diseaseService.getAllDisease();
  }
}
