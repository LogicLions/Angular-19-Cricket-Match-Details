import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { match } from '../../Interfaces/match';
import { MatchService } from '../../services/match.service';
import { Router, RouterLink } from '@angular/router';
import { ConfirmModalComponent } from "../../Shared/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-match-list',
  imports: [RouterLink, ConfirmModalComponent],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css'
})
export class MatchListComponent {
  matches : match[] = [];
  teamone : string = '';
  isDeleteModalVisible : boolean = false;
  recordToBeDeleted : string | undefined = "";

  constructor(private service:MatchService, private router:Router){}

  ngOnInit()
  {
    this.fetchAllMatches();
  }

  fetchAllMatches()
  {
    this.service.getAllMatches().subscribe((result:match[])=>{
      console.log(result);
      this.matches = result;
    });
  }

  updateMatch(id: string | undefined)
  {
    if(id)
      {        
        this.router.navigate(['../match-upsert', id]);
      }
  }

  showDeleteModal(id:string | undefined)
  {
    if(id)
      {
        this.isDeleteModalVisible = true;
        this.recordToBeDeleted = id;
      }
  }

  handleDelete(confirmed:boolean)
  {
    if(this.recordToBeDeleted != "" && this.recordToBeDeleted != undefined && confirmed == true)
      {
        this.service.deleteMatch(this.recordToBeDeleted).subscribe((result:match)=>{
          if(result.id != null && result.id != undefined && result.id != "")
            {
              console.log("Deleted match - " + result.name); 
              this.fetchAllMatches();             
            }
        });
      }
      this.recordToBeDeleted = undefined;
      this.isDeleteModalVisible = false;
  }
}
