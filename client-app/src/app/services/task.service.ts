import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface TaskItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = `${environment.apiBaseUrl}/tasks`;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return of([]); // fallback: return empty list
      })
    );
  }

  getTaskById(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
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

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
