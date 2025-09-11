import { Routes } from '@angular/router';
import { MatchListComponent } from './Match/match-list/match-list.component';
import { PlayerListComponent } from './Player/player-list/player-list.component';
import { TeamListComponent } from './Team/team-list/team-list.component';
import { TeamAddComponent } from './Team/team-add/team-add.component';

export const routes: Routes = [
    {path:"", component:MatchListComponent},
    {path:"teams-list", component:TeamListComponent},
    {path:"team-add", component:TeamAddComponent},
    {path:"players-list", component:PlayerListComponent}
];
