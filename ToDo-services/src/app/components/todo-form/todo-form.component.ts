import { Component, OnInit } from '@angular/core';

import { Task } from '../../shared/task';
import { ServerService } from "../../services/server.service";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string;

  constructor(public server: ServerService) { }

  ngOnInit(): void {}

  addTask() {
    // Add task
    const newTask = {
      userId: 1,
      title: this.title,
      completed: false
    }
    this.server.addTask(newTask).subscribe(data => {
      console.log('Add task: ', data);
    })
  }

}
