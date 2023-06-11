import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { CreateDiseaseRelationDto } from 'src/dto/disease/create-disease-relation.dto';
import { UpdateDiseaseRelationDto } from 'src/dto/disease/update-disease-relation.dto';

@Controller('disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Post()
  createDiseaseRelationWeight(
    @Body() createDiseaseRelationDto: CreateDiseaseRelationDto,
  ) {
    return this.diseaseService.createDiseaseRelation(createDiseaseRelationDto);
  }

  @Get()
  async getAllDiseaseAndWeight() {
    return await this.diseaseService.getAllSymptomsAndDiseaseRelation();
  }

  @Get(':disease_name')
  async getDisease(@Param('disease_name') diseaseName: string) {
    return this.diseaseService.symptomsDisease(diseaseName);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiseaseRelationDto: UpdateDiseaseRelationDto,
  ) {
    return this.diseaseService.updateDiseaseRelation(
      +id,
      updateDiseaseRelationDto,
    );
  }
}
