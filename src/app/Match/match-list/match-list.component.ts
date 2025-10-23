import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { match } from '../../Interfaces/match';
import { MatchService } from '../../services/match.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-match-list',
  imports: [RouterLink],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css'
})
export class MatchListComponent {
  matches : match[] = [];
  teamone : string = '';

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
}
