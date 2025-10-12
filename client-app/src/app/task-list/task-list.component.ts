import { Component } from '@angular/core';
import { TaskService, TaskItem } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {
  tasks: TaskItem[] = [];

  constructor(private taskService: TaskService) { }

  // Page load
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  addNewTask(title: string): void {
    const newTask: TaskItem = { id: 0, title, isCompleted: false };
    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
    });
  }

}
