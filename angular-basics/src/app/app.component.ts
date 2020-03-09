import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // backgroundToggle = false;

  // toggle: any = false;

  arr = [1, 1, 2, 3, 5, 8, 13];

  objs = [
    {title: 'Post 1', author: 'Jack London', comments: [
        {name: 'Max', text: 'lorem 1'},
        {name: 'Max', text: 'lorem 2'},
        {name: 'Max', text: 'lorem 3'},
      ]},
    {title: 'Post 1', author: 'Agata Kristy', comments: [
        {name: 'Pobin', text: 'lorem 1'},
        {name: 'Pobin', text: 'lorem 2'},
        {name: 'Pobin', text: 'lorem 3'},
      ]},
  ]
}
