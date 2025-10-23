import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, TaskItem } from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: TaskItem = { id: 0, title: '', isCompleted: false };
  message = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(id).subscribe({
      next: data => this.task = data,
      error: () => this.message = 'Failed to load task'
    });
  }

  updateTask(): void {
    if (!this.task.title.trim()) {
      this.message = 'Please enter a valid task title';
      return;
    }

    this.taskService.updateTask(this.task).subscribe({
      next: () => {
        this.message = 'Task updated successfully';
        setTimeout(() => this.router.navigate(['/task-list']), 1500);
      },
      error: () => this.message = 'Failed to update task'
    });
  }
}