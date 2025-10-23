import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatchTypesOptions } from '../../static/match-types';
import { team } from '../../Interfaces/team';
import { TeamService } from '../../services/team.service';
import { MatchService } from '../../services/match.service';
import { match } from '../../Interfaces/match';

@Component({
  selector: 'app-match-upsert',
  imports: [RouterLink, NgIf,NgFor, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './match-upsert.component.html',
  styleUrl: './match-upsert.component.css'
})
export class MatchUpsertComponent {
  selectedMatchId : string | null = null;
  matchTypeDropDownOptions : any = null;
  selectedMatchType : number = 0;
  teams : team[] = [];
  matchUpsertFormGroup : FormGroup;
  nameRegEx:RegExp = /^[a-zA-Z0-9\-\s\/_]+$/;
  matchDateRegEx: RegExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  constructor(private fb: FormBuilder, private service: MatchService, private teamService: TeamService, private route:ActivatedRoute)
  {
    this.matchUpsertFormGroup = this.fb.group({
      id:[null],
      name:[
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(this.nameRegEx)]
      ],
      matchType:['', [Validators.required]],
      team1:['', [Validators.required]],
      team2:['',[Validators.required]],
      matchDate:['', [Validators.required, Validators.pattern(this.matchDateRegEx)]]
    });
  }

  ngOnInit()
  {
    this.route.params.subscribe((params)=>{
      this.selectedMatchId = params['id'];

      if(this.selectedMatchId !== null && this.selectedMatchId !== undefined)
        {
          this.service.getMatchById(this.selectedMatchId).subscribe((result: match)=>
            {
              this.matchUpsertFormGroup.setValue({
                id:result.id,
                name:result.name,
                matchType:result.type,
                team1:result.teamone.id,
                team2:result.teamtwo.id,
                matchDate : result.date
              });
            });
        }
    });

    this.matchTypeDropDownOptions = MatchTypesOptions;
    console.log(this.matchTypeDropDownOptions);

    this.teamService.getAllTeams().subscribe((result:team[])=>{      
      this.teams = result;
      console.log(this.teams);      
    });    


  }

  onMatchTypeChange(event:any)
  {
    this.selectedMatchType = event.target.value;
    console.log(this.selectedMatchType);
  }

  upsertMatchDetails()
  {
    let formData = this.matchUpsertFormGroup.value;
    console.log(formData);
    
    const payload : match = {
      name:formData.name,
      type:formData.matchType,
      date:formData.matchDate,
      teamone: this.teams.find((item)=>item.id == formData.team1) ?? {id:'', name:''},      
      teamtwo: this.teams.find((item)=>item.id == formData.team2) ?? {id:'', name:''}
    }

    console.log(payload);

    if(!this.selectedMatchId)
      {
        this.service.addMatch(payload).subscribe((result)=>{
          console.log(result);          
        });
      }
    else
    {
      payload.id = this.selectedMatchId;
      this.service.updateMatch(payload).subscribe((result)=>{
        console.log(result);
        
      });
    }
  }

  get name()
  {
    return this.matchUpsertFormGroup.get('name')
  }

  get matchType()
  {
    return this.matchUpsertFormGroup.get('matchType');
  }

  get team1()
  {
    return this.matchUpsertFormGroup.get('team1');
  }

  get team2()
  {
    return this.matchUpsertFormGroup.get('team2');
  }

  get matchDate()
  {
    return this.matchUpsertFormGroup.get('matchDate');
  }
}
