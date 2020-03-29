import {Component, Input, OnInit} from '@angular/core';
// import { ServerService } from "../../services/server.service";
import { Task } from '../../shared/task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() task: Task;

  constructor() { }

  ngOnInit(): void {
  }

}
