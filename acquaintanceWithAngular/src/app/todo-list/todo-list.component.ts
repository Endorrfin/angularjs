import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';

@Component({
  // moduleId: module.id,
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];

  toggle(todo: Todo) {
    todo.completed = !todo.completed;
  }

  delete(todo: Todo) {
    console.log('delete');
    let index = this.todos.indexOf(todo);

    if(index > -1) {
      this.todos.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }
}
