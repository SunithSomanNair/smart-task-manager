import { Component } from '@angular/core';
import { TaskService, TaskItem } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  newTask = '';
  message = '';

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (!this.newTask.trim()) {
      this.message = 'Please enter a task';
      return;
    }

    const task: TaskItem = { title: this.newTask, isCompleted: false };
    this.taskService.addTask(task).subscribe({
      next: () => {
        this.message = 'Task added successfully';
        this.newTask = '';
      },
      error: () => {
        this.message = 'Failed to add task';
      }
    });
  }
}
