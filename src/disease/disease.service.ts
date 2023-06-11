import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateDiseaseRelationDto } from 'src/dto/disease/create-disease-relation.dto';
import { UpdateDiseaseRelationDto } from 'src/dto/disease/update-disease-relation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiseaseService {
  constructor(private prisma: PrismaService) {}

  async symptomsDisease(userWhereUniqueInput: string) {
    return this.prisma
      .$queryRaw`select * from forward_chaining(${userWhereUniqueInput});`;
  }

  async getAllSymptomsAndDiseaseRelation() {
    return this.prisma
      .$queryRaw`select ds.disease_symptoms_id, d.disease_name, s.symptoms_name, ds.value_weight from disease_symptoms ds
    inner join disease d on ds.disease_id = d.disease_id
    inner join symptoms s on ds.symptoms_id = s.symptoms_id order by d.disease_name;`;
  }

  async getAllSymptoms() {
    return this.prisma.symptoms.findMany({
      select: {
        symptoms_id: true,
        symptoms_name: true,
      },
    });
  }

  async getAllDisease() {
    return this.prisma.disease.findMany({
      select: {
        disease_id: true,
        disease_name: true,
        output_bot: true,
      },
    });
  }

  findOneGejala(userWhereUniqueInput) {
    return this.prisma.symptoms.findFirst({
      where: {
        symptoms_name: userWhereUniqueInput,
      },
      select: {
        symptoms_id: true,
      },
    });
  }

  findOnePenyakit(userWhereUniqueInput) {
    return this.prisma.disease.findFirst({
      where: {
        disease_name: userWhereUniqueInput,
      },
      select: {
        disease_id: true,
      },
    });
  }

  findOneDiseaseRelation(userWhereUniqueInput: number) {
    return this.prisma.disease_symptoms.findUnique({
      where: {
        disease_symptoms_id: userWhereUniqueInput,
      },
    });
  }

  async findOneDiseaseRelationWithJoin(userWhereUniqueInput: number) {
    const findIdRelation = await this.findOneDiseaseRelation(
      userWhereUniqueInput,
    );

    if (!findIdRelation) {
      throw new NotFoundException('Id Not Found');
    }

    return this.prisma.disease_symptoms.findUnique({
      where: {
        disease_symptoms_id: userWhereUniqueInput,
      },
      include: {
        disease: {
          select: {
            disease_name: true,
          },
        },
        symptoms: {
          select: {
            symptoms_name: true,
          },
        },
      },
    });
  }

  async updateDiseaseRelation(
    id: number,
    updateDiseaseRelation: UpdateDiseaseRelationDto,
  ) {
    const findIdRelation = await this.findOneDiseaseRelation(id);

    if (!findIdRelation) {
      throw new NotFoundException(`id ${id} tidak ditemukan`);
    }

    const findIdByGejala = await this.findOneGejala(
      updateDiseaseRelation.symptoms_name,
    );
    const findIdByPenyakit = await this.findOnePenyakit(
      updateDiseaseRelation.disease_name,
    );

    if (!findIdByGejala || !findIdByPenyakit) {
      throw new NotFoundException('data penyakit atau gejala tidak sesuai');
    }

    return this.prisma
      .$queryRaw`update disease_symptoms set disease_id = ${findIdByPenyakit.disease_id}, symptoms_id = ${findIdByGejala.symptoms_id}, value_weight = ${updateDiseaseRelation.value_weight}
    where disease_symptoms_id = ${findIdRelation.disease_symptoms_id}`;
  }

  async createDiseaseRelation(createDiseaseRelation: CreateDiseaseRelationDto) {
    const findIdByGejala = await this.findOneGejala(
      createDiseaseRelation.symptoms_name,
    );
    const findIdByPenyakit = await this.findOnePenyakit(
      createDiseaseRelation.disease_name,
    );

    if (!findIdByGejala || !findIdByPenyakit) {
      throw new NotFoundException('data penyakit atau gejala tidak sesuai');
    }

    return this.prisma
      .$queryRaw`insert into disease_symptoms (disease_id, symptoms_id, value_weight) values (${findIdByPenyakit.disease_id}, ${findIdByGejala.symptoms_id}, ${createDiseaseRelation.value_weight})`;
  }
}
