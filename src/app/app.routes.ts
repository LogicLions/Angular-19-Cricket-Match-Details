import { Routes } from '@angular/router';
import { MatchListComponent } from './Match/match-list/match-list.component';
import { PlayerListComponent } from './Player/player-list/player-list.component';
import { TeamListComponent } from './Team/team-list/team-list.component';
import { TeamUpsertComponent } from './Team/team-upsert/team-upsert.component';
import { PlayerUpsertComponent } from './Player/player-upsert/player-upsert.component';
import { MatchUpsertComponent } from './Match/match-upsert/match-upsert.component';

export const routes: Routes = [
    {path:"", component:MatchListComponent},
    {path:"match-list", component:MatchListComponent},
    {path:"match-upsert", component:MatchUpsertComponent},
    {path:"match-upsert/:id", component:MatchUpsertComponent},
    {path:"teams-list", component:TeamListComponent},
    {path:"team-upsert", component:TeamUpsertComponent},
    {path:"team-upsert/:id", component:TeamUpsertComponent},
    {path:"player-list", component:PlayerListComponent},
    {path:"player-upsert", component:PlayerUpsertComponent},
    {path:"player-upsert/:id", component:PlayerUpsertComponent}
];
