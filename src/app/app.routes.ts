import { Routes } from '@angular/router';
import { MatchListComponent } from './Match/match-list/match-list.component';
import { PlayerListComponent } from './Player/player-list/player-list.component';
import { TeamListComponent } from './Team/team-list/team-list.component';

export const routes: Routes = [
    {path:"", component:MatchListComponent},
    {path:"teams", component:TeamListComponent},
    {path:"players", component:PlayerListComponent}
];
