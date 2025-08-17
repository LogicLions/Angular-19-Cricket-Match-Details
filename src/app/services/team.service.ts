import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { team } from '../Interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  url:string = "http://localhost:3000/teams";

  constructor(private http:HttpClient) { }

  getAllTeams():Observable<team[]>
  {
    return this.http.get<team[]>(this.url);
  }
}
