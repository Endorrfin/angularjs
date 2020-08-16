import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoggerService} from "./services/logger.service";
import {BetterLoggerService} from "./services/better-logger.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BetterLoggerService,
    {
      provide: LoggerService,
      useClass: BetterLoggerService
      // useExisting: BetterLoggerService
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
