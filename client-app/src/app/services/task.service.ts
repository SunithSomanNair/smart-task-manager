import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface TaskItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = 'http://localhost:5157/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return of([]); // fallback: return empty list
      })
    );
  }

  addTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task).pipe(
      catchError(error => {
        console.error('Error adding task:', error);
        return of(task); // return original task if error
      })
    );
  }

  updateTask(task: TaskItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }
}
