import { team } from "./team"

export interface match
{
    id:number,
    name:string,
    type:string,
    date:string,
    teamone: team,
    teamtwo: team
}