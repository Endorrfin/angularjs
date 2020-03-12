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

  toggle(todo: any) {
    todo.completed = !todo.completed;
    console.log('toggle', todo);
  }

  delete(todo: any) {
    let index = this.todos.indexOf(todo);

    if(index > -1) {
      this.todos.splice(index, 1);
    }
  }
}


