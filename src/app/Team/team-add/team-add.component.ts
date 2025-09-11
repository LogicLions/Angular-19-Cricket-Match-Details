import { NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { team } from '../../Interfaces/team';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-add',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './team-add.component.html',
  styleUrl: './team-add.component.css'
})
export class TeamAddComponent 
{
  teamAddForm : FormGroup;
  successMessage : string = '';
  nameRegEx : RegExp = /^[A-Za-z]+([ \t][A-Za-z]+)*$/;

  constructor(private service: TeamService, private fb: FormBuilder)
  {
    this.teamAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.nameRegEx)]]
    });
  }

  submitTeamAddForm()
  {
    let val = this.teamAddForm.value;
    this.service.addTeam(val).subscribe((result:team)=>{
      console.log(result);
      if((result != null || result != undefined) && result.id != null && result.name != null)
        {
          this.successMessage = "Team - " + result.name + " added successfully!!";
          this.teamAddForm.reset();
        }
    });
  }

  get name()
  {
    return this.teamAddForm.get('name');
  }
}
