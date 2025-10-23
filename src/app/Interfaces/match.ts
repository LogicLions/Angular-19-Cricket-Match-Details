import { team } from "./team"

export interface match
{
    id?:string,
    name:string,
    type:string,
    date:string,
    teamone: team,
    teamtwo: team
}