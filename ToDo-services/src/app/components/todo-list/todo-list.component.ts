import { Component, OnInit } from '@angular/core';
import { ServerService} from "../../services/server.service";
import { Task } from '../../shared/task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tasks: Task[];

  constructor(public server: ServerService) { }

  ngOnInit(): void {
    // this.server.getTask()
    console.log(this.server.getTask());

    // Get all tasks
    this.tasks = this.server.getTask();
  }

}
