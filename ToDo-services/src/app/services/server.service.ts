import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { Task } from '../shared/task'

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  tasks: Task[] = [
    {
      id: '1',
      title: 'some task #1'
    },
    {
      id: '2',
      title: 'some task #2'
    },
    {
      id: '3',
      title: 'some task #3'
    }
  ];

  configURL = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(public http: HttpClient ) { }

  getTask() {
    return this.tasks
  }

}
