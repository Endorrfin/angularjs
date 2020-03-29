import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { ServerService } from "../../services/server.service";
import { Task } from '../../shared/task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() task: Task;
  @Output() delete = new EventEmitter; // EventEmitter - это набор методов для возможности создать событие (эмитить событие)

  constructor(public server: ServerService) { }

  ngOnInit(): void {
  }

  deleteOneTask() {
    // Generate event
    // this.server.deleteTask(this.task.id).subscribe(data => {
    //   console.log('Delete: ', data);
    this.delete.emit(this.task.id); // = $Event | распространяем это событие родительской компоненте
  }
}
