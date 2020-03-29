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

  ngOnInit() {
    // this.server.getTask()
    // console.log(this.server.getTask());

    // Get all tasks
    // this.tasks = this.server.getTask();
    this.server.getTasks().subscribe(data => {
      if(data) {
        this.tasks = data;
      }
    }, error => {
      console.log(error);
    })
  }

  deleteTask(id) {
    this.server.deleteTask(id).subscribe(data => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    })
  }

  Identify(index) {
    return index;
  }

}
