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

  getPlayerById(val :string):Observable<player>
  {
    return this.http.get<player>(this.url +"/"+ val);
  }

  addPlayer(val:player):Observable<player>
  {
    return this.http.post<player>(this.url, val);
  }

  updatePlayer(val:player):Observable<player>
  {
    return this.http.put<player>(this.url +"/"+ val.id, val);
  }

  deletePlayer(val:string):Observable<player>
  {
    return this.http.delete<player>(this.url +"/"+ val);
  }
}
