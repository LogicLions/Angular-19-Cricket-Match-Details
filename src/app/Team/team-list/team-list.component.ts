import { Component, Input, Output } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { team } from '../../Interfaces/team';
import { TeamUpsertComponent } from '../team-upsert/team-upsert.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ConfirmModalComponent } from '../../Shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-team-list',
  imports: [RouterLink, ConfirmModalComponent],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent {
  teams: team[] = [];
  isDeleteModalVisible: boolean = false;
  recordToDelete: string | null = null;

  constructor(private service: TeamService, private router: Router) {}

  ngOnInit() {
    this.fetchAllTeams();
  }

  fetchAllTeams() {
    this.service.getAllTeams().subscribe((result: team[]) => {
      console.log(result);
      this.teams = result;
    });
  }

  updateTeam(id: string | undefined) {
    this.router.navigate(['/team-upsert', id]);
  }

  openDeleteModal(id: string | undefined) {
    if (id !== undefined) {
      this.isDeleteModalVisible = true;
      this.recordToDelete = id;
    }
  }

  handleDeleteConfirm(confirmed: boolean): void {
    if (confirmed && this.recordToDelete !== null) {
      this.deleteTeam(this.recordToDelete);
    }
    this.isDeleteModalVisible = false;
    this.recordToDelete = null;
  }

  deleteTeam(id: string) {
    this.service.deleteTeam(id).subscribe((result: team) => {
      console.log('deleted');
      if (result) {
        this.fetchAllTeams();
      }
    });
  }
}
