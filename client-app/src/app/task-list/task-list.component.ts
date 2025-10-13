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

  toggleStatus(task: TaskItem): void {
    const updatedTask: TaskItem = {
      ...task,
      isCompleted: !task.isCompleted
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        task.isCompleted = updatedTask.isCompleted;
      },
      error: () => {
        this.errorMessage = 'Failed to update task status.';
      }
    });
  }

}
