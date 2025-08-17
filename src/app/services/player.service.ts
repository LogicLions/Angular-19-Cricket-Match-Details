import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { player } from '../Interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  url:string = "http://localhost:3000/players";
  constructor(private http:HttpClient) { }

  getAllPlayers():Observable<player[]>
  {
    return this.http.get<player[]>(this.url);
  }
}
