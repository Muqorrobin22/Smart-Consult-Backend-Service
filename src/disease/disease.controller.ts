import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
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

  @Get('/relation/:id')
  async getSpesificDiseaseRelation(@Param('id') id: string) {
    return this.diseaseService.findOneDiseaseRelationWithJoin(+id);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diseaseService.removeDiseaseRelation(+id);
  }
}
