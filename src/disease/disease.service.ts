import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateDiseaseRelationDto } from 'src/dto/disease/create-disease-relation.dto';
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

  async createDiseaseRelation(createDiseaseRelation: CreateDiseaseRelationDto) {
    const findIdByGejala = await this.findOneGejala(
      createDiseaseRelation.symptoms_name,
    );
    const findIdByPenyakit = await this.findOnePenyakit(
      createDiseaseRelation.disease_name,
    );

    // if (
    //   findIdByGejala?.symptoms_id &&
    //   typeof findIdByGejala?.symptoms_id === 'object'
    // ) {
    //   const petsObject = findIdByGejala?.symptoms_id

    // }

    // const newIdGejala = JSON.parse()

    return this.prisma
      .$queryRaw`insert into disease_symptoms (disease_id, symptoms_id, value_weight) values (${findIdByPenyakit.disease_id}, ${findIdByGejala.symptoms_id}, ${createDiseaseRelation.value_weight})`;
  }
}
