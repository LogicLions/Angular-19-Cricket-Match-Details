import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { team } from '../../Interfaces/team';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-upsert',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './team-upsert.component.html',
  styleUrl: './team-upsert.component.css',
})
export class TeamUpsertComponent {
  teamUpsertFormGroup: FormGroup;
  selectedTeamId: string | null = null;
  successMessage: string = "";
  unsuccessMessage:string = "";
  nameRegEx: RegExp = /^[A-Za-z]+([ \t][A-Za-z]+)*$/;

  constructor(
    private service: TeamService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.teamUpsertFormGroup = this.fb.group({
      id:[null],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(this.nameRegEx),
        ],
      ],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.selectedTeamId = params['id'];
      if(this.selectedTeamId)
        {
          this.service.getTeamById(this.selectedTeamId).subscribe((result:team)=>{
            console.log(result);
            this.teamUpsertFormGroup.patchValue(result);
          });
        }
    });
  }

  submitTeamUpsertForm() {
    let val = this.teamUpsertFormGroup.value;

    if (this.selectedTeamId) {
      this.service.updateTeam(val).subscribe((result:team)=>{
        console.log(result);
        if ((result != null || result != undefined) && result.id != null && result.name != null )
        {
          this.successMessage =
            "Team '" + result.name + "' updated successfully!!";
          this.teamUpsertFormGroup.reset();
        }
        else
        {
          this.unsuccessMessage = "Error occured: Unable to update!!";
        }    
      });
    } else {
      const payload : team =
      {
        name:val.name
      }
      this.service.addTeam(payload).subscribe((result: team) => {
        console.log(result);
        if ((result != null || result != undefined) && result.id != null && result.name != null)
        {
          this.successMessage =
            "Team '" + result.name + "' added successfully!!";
          this.teamUpsertFormGroup.reset();
        }
        else
        {
          this.unsuccessMessage = "Error occured: Unable to add!!";
        } 
      });
    }
  }

  get name() {
    return this.teamUpsertFormGroup.get('name');
  }
}
