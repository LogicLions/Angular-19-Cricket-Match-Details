import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { player } from '../../Interfaces/player';
import { Router, RouterLink } from '@angular/router';
import { ConfirmModalComponent } from "../../Shared/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-player-list',
  imports: [RouterLink, ConfirmModalComponent],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {
  players: player[] = [];
  isDeleteModalVisible : boolean = false;
  recordToDelete : string | null = null;

  constructor(private service: PlayerService, private router:Router){}

  ngOnInit()
  {
    this.fetchAllPlayers();
  }

  
  updatePlayer(id:string | undefined)
  {
    if(id !== undefined)
      {
        this.router.navigate(['../player-upsert', id]);
      }
  }

  openDeleteModal(id:string | undefined)
  {
    if(id)
      {
        this.isDeleteModalVisible = true;
        this.recordToDelete = id;
      }
  }

  handleDeleteConfirm(confirmed:boolean)
  {
    if(confirmed && this.recordToDelete !== null)
      {
        this.deletePlayer(this.recordToDelete);
      }
      this.isDeleteModalVisible = false;
      this.recordToDelete = null;
  }

  deletePlayer(id:string)
  {
    this.service.deletePlayer(id).subscribe((result:player)=>{
      if(result)
        {
          console.log("Deleted");
          this.fetchAllPlayers();
        }
    });
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
