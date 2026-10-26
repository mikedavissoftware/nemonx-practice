import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello!';
  }

  getOther(): string {
    return "what up cuz?";
  }
}
