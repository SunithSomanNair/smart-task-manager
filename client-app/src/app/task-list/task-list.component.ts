import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks = [
    { title: 'Buy groceries', done: false },
    { title: 'Finish Angular demo', done: true },
    { title: 'Call Sunith', done: false }
  ];
}
