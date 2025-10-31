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

  selectedTask: TaskItem | null = null;
  showModal = false;
  message = '';
  confirmMessage = '';

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

  confirmDelete(task: TaskItem): void {
    this.selectedTask = task;
    this.confirmMessage = 'Are you sure you want to delete this task?';
    this.showModal = true;
  }

  deleteConfirmed(): void {
    if (!this.selectedTask) return;

    this.taskService.deleteTask(this.selectedTask.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== this.selectedTask?.id);
        this.showModal = false;
        this.selectedTask = null;
      },
      error: () => {
        this.message = 'Failed to delete task';
        this.showModal = false;
      }
    });
  }

}
