import { Component } from '@angular/core';
import { TaskService, TaskItem } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {
  tasks: TaskItem[] = [];
  loading = false;
  errorMessage = '';

  constructor(private taskService: TaskService) { }

  // Page load
  ngOnInit(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: data => {
        this.tasks = data;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = 'Failed to load tasks.';
        this.loading = false;
      }
    });
  }

  addNewTask(title: string): void {
    if (!title.trim()) {
      this.errorMessage = 'Task title cannot be empty.';
      return;
    }

    const newTask: TaskItem = { id: 0, title, isCompleted: false };
    this.taskService.addTask(newTask).subscribe({
      next: task => {
        this.tasks.push(task);
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = 'Failed to add task.';
      }
    });
  }

}
