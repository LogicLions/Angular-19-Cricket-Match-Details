import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { TeamService } from '../../services/team.service';
import { team } from '../../Interfaces/team';
import { player } from '../../Interfaces/player';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-player-upsert',
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './player-upsert.component.html',
  styleUrl: './player-upsert.component.css',
})
export class PlayerUpsertComponent {
  playerUpsertFormGroup: FormGroup;
  teams: team[] = [];
  selectedPlayerId: string | null = null;
  successMessage: string = '';
  unsuccessMessage: string = '';
  nameRegEx: RegExp = /^[A-Za-z]+([ \t][A-Za-z]+)*$/;

  constructor(
    private service: PlayerService,
    private teamService: TeamService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.playerUpsertFormGroup = this.fb.group({
      id: [null],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.nameRegEx),
        ],
      ],
      team: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((result: team[]) => {
      console.log(result);
      this.teams = result;
    });

    this.route.params.subscribe((params) => {
      console.log(params);
      this.selectedPlayerId = params['id'];
      if (this.selectedPlayerId !== null) {
        this.service
          .getPlayerById(this.selectedPlayerId)
          .subscribe((result: player) => {
            this.playerUpsertFormGroup.setValue({
              id: result.id,
              name: result.name,
              team: result.team.id,
            });
          });
      }
    });
  }

  submitUpsertPlayerForm() {
    let formData = this.playerUpsertFormGroup.value;
    console.log(formData);

    const payload: player = {
      name: formData.name,
      team: this.teams.find((item) => item.id === formData.team) ?? {
        id: '',
        name: '',
      },
    };

    if (!this.selectedPlayerId) {
      console.log(payload);
      this.service.addPlayer(payload).subscribe((result: player) => {
        console.log(result);
        if (result.id != null && result.id != undefined && result.id != '') {
          this.successMessage =
            "Player '" + result.name + "' is succesfully added!!";
            
        this.playerUpsertFormGroup.reset();
        } else {
          this.unsuccessMessage = 'Error occured: Unable to add!!';
        }
      });
    } else {
      payload.id = this.selectedPlayerId;
      this.service.updatePlayer(payload).subscribe((result: player) => {
        console.log(result);
        if (result.id != null && result.id != undefined && result.id != '') {
          this.successMessage =
            "Player '" + result.name + "' is succesfully updated!!";
            this.playerUpsertFormGroup.reset();
        } else {
          this.unsuccessMessage = 'Error occured: Unable to update!!';
        }
        
      });
    }
  }

  get name() {
    return this.playerUpsertFormGroup.get('name');
  }

  get team() {
    return this.playerUpsertFormGroup.get('team');
  }
}
