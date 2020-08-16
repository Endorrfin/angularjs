import { Component } from '@angular/core';
import {LoggerService} from "./services/logger.service";
import {BetterLoggerService} from "./services/better-logger.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-DI';

  constructor(
    logger: LoggerService,
    betterLogger: BetterLoggerService
  ) {
    logger.info( 'Подписался на мой канал?');
    betterLogger.info('Подписался на мой канал?');
  }
}
