import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { Task } from '../shared/task'

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  // tasks: Task[] = [
  //   {
  //     id: '1',
  //     title: 'some task #1'
  //   },
  //   {
  //     id: '2',
  //     title: 'some task #2'
  //   },
  //   {
  //     id: '3',
  //     title: 'some task #3'
  //   }
  // ];

  configURL = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(public http: HttpClient ) { }


  // http запросы реализовываются в формате Obsorvable и чтобы получить ответ от server мы должны подписаться
  getTasks() {
    return this.http.get(this.configURL)
  }

  deleteTask(id: number) {
    return this.http.delete(this.configURL + id);
  }

}
