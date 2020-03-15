import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';

@Component({
  // moduleId: module.id,
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() delete = new EventEmitter();

  toggle() {
    this.todo.completed = !this.todo.completed;
  }

  onDelete() {
    this.delete.emit(this.todo);
  }



  constructor() { }

  ngOnInit(): void {
  }

}
