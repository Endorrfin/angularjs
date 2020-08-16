import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string = '';
  @Output() add = new EventEmitter();

  onSubmit() {
    this.add.emit(this.title);
  }


  create() {
  }

  constructor() { }

  ngOnInit(): void {
  }

}
