export interface Log {
    lastdate : string
    countUpdate: number
    countInsert: number
    countDelete: number
}

export interface UserId {
    id_user : number
}
export interface UserDetail {
    id_user : number
    nom_com: string
    prenom_com:string
    id_equipe: number
    tel: number
    fax: number
    email:string
}

export interface LogDetail {
  id_log: number
  date: Date
  id_user: number
  ca: string
  event: string
  id_fiche: number
  query: string 
  route: string
  method: string
  
}
export interface ChartClicked {
  x: string
  y:any
  user:string
  date: string
  event:string
}
