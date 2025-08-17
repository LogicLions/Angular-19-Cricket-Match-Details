import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { player } from '../../Interfaces/player';

@Component({
  selector: 'app-player-list',
  imports: [],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {
  players: player[] = [];

  constructor(private service: PlayerService){}

  ngOnInit()
  {
    this.fetchAllPlayers();
  }

  fetchAllPlayers()
  {
    this.service.getAllPlayers().subscribe((result:player[])=>
    {
      console.log(result);
      this.players = result;
    });
  }
}
