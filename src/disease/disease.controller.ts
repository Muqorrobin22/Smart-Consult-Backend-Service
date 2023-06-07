import { Controller, Get, Param } from '@nestjs/common';
import { DiseaseService } from './disease.service';

@Controller('disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Get()
  async getAllDiseaseAndWeight() {
    return await this.diseaseService.getAllSymptomsAndDiseaseRelation();
  }

  @Get(':disease_name')
  async getDisease(@Param('disease_name') diseaseName: string) {
    return this.diseaseService.symptomsDisease(diseaseName);
  }
}
