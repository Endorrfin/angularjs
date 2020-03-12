import { Component } from '@angular/core';

const todos = [
  {
    title: 'Изучить JavaScript',
    completed: true
  },
  {
    title: 'Изучить Angular',
    completed: false
  },
  {
    title: 'Написать приложение',
    completed: false
  },
  {
    title: 'Залить приложение на gitHub',
    completed: false
  }
];

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo list Angular';
  todos = todos;
}
