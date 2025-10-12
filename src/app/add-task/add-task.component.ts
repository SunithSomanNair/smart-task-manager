import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  newTask = '';
  message = '';

  addTask() {
    if (this.newTask.trim()) {
      this.message = `Task "${this.newTask}" added`;
      this.newTask = '';
    } else {
      this.message = 'Please enter a task';
    }
  }
}
