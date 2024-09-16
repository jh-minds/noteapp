import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private apiUrl = 'http://localhost:8080/api/'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getContainers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/containers`);
  }

  saveContainer(container: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/containers`, container);
  }

  deleteContainer(containerName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/containers/${containerName}`);
  }

  saveItem(containerName: string, item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/containers/${containerName}/items`, item);
  }

  deleteItem(containerName: string, itemIndex: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/containers/${containerName}/items/${itemIndex}`);
  }
}