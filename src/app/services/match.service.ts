import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { match } from '../Interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  url:string = "http://localhost:3000/matches";
  constructor(private http:HttpClient) {}

  getAllMatches():Observable<match[]>
  {
    return this.http.get<match[]>(this.url);
  }

  getMatchById(id: string): Observable<match>
  {
    return this.http.get<match>(this.url +"/"+ id);
  }

  addMatch(val: match):Observable<match>
  {
    return this.http.post<match>(this.url, val);
  }

  updateMatch(val:match):Observable<match>
  {
    return this.http.put<match>(this.url +"/"+ val.id, val);
  }
}
