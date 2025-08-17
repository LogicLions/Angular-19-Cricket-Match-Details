import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { team } from '../../Interfaces/team';

@Component({
  selector: 'app-team-list',
  imports: [],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {
  teams: team[] = [];

  constructor(private service:TeamService){}

  ngOnInit()
  {
    this.fetchAllTeams();
  }

  fetchAllTeams()
  {
    this.service.getAllTeams().subscribe((result:team[])=>{
      console.log(result);
      this.teams = result;
    });    
  }

}
