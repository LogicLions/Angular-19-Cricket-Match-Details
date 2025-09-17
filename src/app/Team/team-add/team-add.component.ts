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
  selector: 'app-team-add',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './team-add.component.html',
  styleUrl: './team-add.component.css',
})
export class TeamAddComponent {
  teamAddFormGroup: FormGroup;
  selectedTeamId: string | null = null;
  successMessage: string = "";
  unsuccessMessage:string = "";
  nameRegEx: RegExp = /^[A-Za-z]+([ \t][A-Za-z]+)*$/;

  constructor(
    private service: TeamService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.teamAddFormGroup = this.fb.group({
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
            this.teamAddFormGroup.patchValue(result);
          });
        }
    });
  }

  submitTeamAddForm() {
    let val = this.teamAddFormGroup.value;

    if (this.selectedTeamId) {
      this.service.updateTeam(val).subscribe((result:team)=>{
        console.log(result);
        if ((result != null || result != undefined) && result.id != null && result.name != null )
        {
          this.successMessage =
            "Team '" + result.name + "' updated successfully!!";
          this.teamAddFormGroup.reset();
        }
        else
        {
          this.unsuccessMessage = "Error occured: Unable to update!!";
        }    
      });
    } else {
      this.service.addTeam(val).subscribe((result: team) => {
        console.log(result);
        if ((result != null || result != undefined) && result.id != null && result.name != null)
        {
          this.successMessage =
            "Team '" + result.name + "' added successfully!!";
          this.teamAddFormGroup.reset();
        }
        else
        {
          this.unsuccessMessage = "Error occured: Unable to add!!";
        } 
      });
    }
  }

  get name() {
    return this.teamAddFormGroup.get('name');
  }
}
