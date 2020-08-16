import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  info(msg: string) {
    console.log(msg);
  }

}
