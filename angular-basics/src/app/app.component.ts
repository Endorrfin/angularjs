import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-basics';
  // title = 'Dynamic title';
  number = 42;
  arr = [1, 2, 3];
  obj = {a: 1, b: {c: 2} };

  inputValue =  '';

// binding typeScript with html []
  // img = 'https://b7.pngbarn.com/png/78/799/react-redux-javascript-library-node-js-facebook-react-png-clip-art-thumbnail.png';

  constructor() {
    //   setTimeout(() => {
    //     console.log('timeout is over');
    //     this.img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/240px-Angular_full_color_logo.svg.png';
    //   }, 5000);
  }

  onInput(event: KeyboardEvent) {
    this.inputValue = (<HTMLInputElement>event.target).value
  }

  onBlur(str: string) {
    this.inputValue = str
  }

  onClick() {
    console.log('Click!');
  }

}
