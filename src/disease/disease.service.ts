import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
        symptoms_name: true,
      },
    });
  }

  async getAllDisease() {
    return this.prisma.disease.findMany({
      select: {
        disease_name: true,
        output_bot: true,
      },
    });
  }
}
