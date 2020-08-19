import { Component } from '@angular/core';
import { TranslateService } from "./translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputText: string;
  translatedText: string
  constructor (private translateService: TranslateService) {}

  submit() {
    this.translateService.translate(this.inputText).subscribe((result) => {
      this.translatedText = result;
    })
  }
}
