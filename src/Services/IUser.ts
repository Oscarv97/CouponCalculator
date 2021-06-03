export interface IUser {
    id: number;
    birthday:number;
    spend: number;
    region: REGION_,
    gender: string, 
}

export enum REGION_ {
    "None",
    "United States",
    "Europe",
    "APAC",
    "Latin America",
}


export enum GENDER_ {
    None,
    Male,
    Female
}