import { Controller, Param, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get(':disease_name')
  async getBotResposne(@Param('disease_name') diseaseName: string) {
    return this.botService.getBotResponse(diseaseName);
  }
}
