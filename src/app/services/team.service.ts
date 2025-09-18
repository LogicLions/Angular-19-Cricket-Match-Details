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

  getTeamById(val:string):Observable<team>
  {
    return this.http.get<team>(this.url +"/"+ val);
  }

  addTeam(val:team):Observable<team>  
  {
    return this.http.post<team>(this.url, val);
  }

  updateTeam(val:team):Observable<team>
  {
    return this.http.put<team>(this.url +"/"+ val.id, val);
  }

  deleteTeam(val:string):Observable<team>
  {
    return this.http.delete<team>(this.url +"/"+ val);
  }
}
